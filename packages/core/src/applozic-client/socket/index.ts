import { Stomp, CompatClient, Message } from '@stomp/stompjs';
import LoginResult from '../models/LoginResult';
import { IncomingMessage } from '../models/Message';
import { SocketEventListener } from './socket-events';
import { processMessage } from './message-handler';

export interface ApplozicSocketOptions {
  /** Applozic AppID */
  applicationId: string;
  /** Result from login API */
  loginResult: LoginResult;
  /** Callbacks for realtime events like new message, typing status etc. */
  events?: SocketEventListener;
}

/**
 * This class handles the socket connection to the applozic server.
 */
export default class ApplozicSocket {
  /** Internal stomp client */
  private stompClient: CompatClient;
  /** WebSocket for the stomp client */
  private webSocket: WebSocket;
  /** Promise to check if connection is initialized */
  public connectionPromise: Promise<CompatClient>;
  /** Resolves initialization promise outside the initialization context */
  private connectionPromiseResolver: Function;
  /** Socket options */
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

  /**
   * Start connection to WebSocket server
   *
   * @returns Promise that resolves when connection is established
   */
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
    this.sendStatus(true);
    this.subscribe(`/topic/${this.options.loginResult.token}`, this.onMessage);
    if (this.options.events && this.options.events.onConnect) {
      this.options.events.onConnect();
    }
  };

  /**
   * Subscribe to a topic
   * @param topic Topic name
   * @param callback Function to run on new message in topic
   */
  public subscribe = async (
    topic: string,
    callback: { (stompMessage: Message): void }
  ) => {
    const stompClient = this.getStompClient();
    await this.connect();
    stompClient.subscribe(topic, callback);
  };

  /**
   * Unsubscribe from a topic
   * @param topic Topic name
   */
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

  /**
   * Set current logged in user online status
   * @param isOnline True if user is online, false otherwise
   */
  public sendStatus = (isOnline: boolean) => {
    const { token, deviceKey } = this.options.loginResult;
    const topic = '/topic/status-v2';
    const message = `${token},${deviceKey},${isOnline ? 1 : 0}`;
    this.sendMessage(topic, message);
  };

  /** Disconnect from the websocket */
  public disconnect = async () => {
    if (this.stompClient) {
      await this.stompClient.deactivate();
    }
  };

  /**
   * Send a message to the server via websocket
   *
   * @param topic WebSocket topic
   * @param body message content
   */
  public sendMessage = async (topic: string, body: string) => {
    const client = this.getStompClient();
    await this.connectionPromise;
    client.send(topic, { 'content-type': 'text/plain' }, body);
  };
}
