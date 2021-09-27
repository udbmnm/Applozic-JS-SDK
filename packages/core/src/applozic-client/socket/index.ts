import { Stomp, CompatClient, Message } from '@stomp/stompjs';
import LoginResult from '../models/LoginResult';
import { IncomingMessage } from '../models/Message';
import { SocketEventListener } from './socket-events';
import { processMessage } from './message-handler';

interface ApplozicSocketOptions {
  applicationId: string;
  loginResult: LoginResult;
  events?: SocketEventListener;
}

export default class ApplozicSocket {
  private stompClient: CompatClient;
  private webSocket: WebSocket;
  public connectionPromise: Promise<CompatClient>;
  private connectionPromiseResolver: Function;
  private options: ApplozicSocketOptions;

  constructor(options: ApplozicSocketOptions) {
    this.options = options;
  }

  private getWebSocket = (): WebSocket => {
    if (this.webSocket) {
      return this.webSocket;
    }
    let { websocketUrl } = this.options.loginResult;
    const { websocketPort } = this.options.loginResult;
    websocketUrl = websocketUrl.replace('https://', '');
    const socketUrl = `wss://${websocketUrl}:${websocketPort}/ws`;
    this.webSocket = new WebSocket(socketUrl);
    return this.webSocket;
  };

  private getStompClient = (): CompatClient => {
    if (this.stompClient) {
      return this.stompClient;
    }
    this.stompClient = Stomp.over(this.getWebSocket);
    this.stompClient.heartbeat.outgoing = 10000;
    this.stompClient.heartbeat.incoming = 0;
    this.stompClient.reconnect_delay = 30000;
    this.stompClient.debug = () => {}; // Disable stomp debug messages
    return this.stompClient;
  };

  private onMessage = (stompMessage: Message) => {
    try {
      const messageData: IncomingMessage = JSON.parse(stompMessage.body);
      processMessage({ messageData, events: this.options.events });
    } catch (e) {
      console.error('Error parsing message', stompMessage);
    }
  };

  public connect = (): Promise<CompatClient> => {
    if (this.connectionPromise) {
      return this.connectionPromise;
    }
    this.connectionPromise = new Promise(resolve => {
      this.connectionPromiseResolver = resolve;
    });
    this.getStompClient().connect(
      this.options.applicationId,
      this.options.loginResult.authToken,
      this.onConnect,
      this.onError,
      this.onClose,
      '/'
    );
    return this.connectionPromise;
  };

  private onConnect = async () => {
    // No need to await on subscription
    if (this.connectionPromiseResolver) {
      this.connectionPromiseResolver(this.stompClient);
    }
    this.sendStatus(1);
    this.subscribe(`/topic/${this.options.loginResult.token}`, this.onMessage);
    if (this.options.events && this.options.events.onConnect) {
      this.options.events.onConnect();
    }
  };

  public subscribe = async (
    topic: string,
    callback: { (stompMessage: Message): void }
  ) => {
    const stompClient = this.getStompClient();
    await this.connect();
    stompClient.subscribe(topic, callback);
  };

  public unSubscribe = async (topic: string) => {
    const stompClient = this.getStompClient();
    await this.connectionPromise;
    stompClient.unsubscribe(topic);
  };

  private onError = (err: Error) => {
    console.error('Error connecting', err);
  };

  private onClose = (event: any) => {
    console.error('Socket closing', event);
  };

  public sendStatus = (status: number) => {
    const { token, deviceKey } = this.options.loginResult;
    const topic = '/topic/status-v2';
    const message = `${token},${deviceKey},${status}`;
    this.sendMessage(topic, message);
  };

  public disconnect = async () => {
    if (this.stompClient) {
      await this.stompClient.deactivate();
    }
  };

  public sendMessage = async (topic: string, body: string) => {
    const client = this.getStompClient();
    await this.connectionPromise;
    client.send(topic, { 'content-type': 'text/plain' }, body);
  };
}
