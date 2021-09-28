import BaseClientWithStore, {
  BaseClientWithStoreOptions
} from './base-with-store';
import ApplozicSocket from './socket';
import LoginResult from './models/LoginResult';
import { SocketEventListener } from './socket/socket-events';

interface ApplozicClientOptions extends BaseClientWithStoreOptions {
  useSocket?: boolean;
  events?: SocketEventListener;
}

/**
 * This is the main class for interacting with the Applozic API.
 * This class incorporates the [BaseClientWithStore](./base-with-store.ts) class
 *
 * Sample usage:
 *
 * ```TypeScript
 * import ApplozicClient from '@applozic/core-sdk';
 *
 * const applozicClient = new ApplozicClient('YOUR-APPLOZIC-APP-ID', {
 *   events: {
 *     onMessageReceived: ({ message }) => {
 *       console.log('onMessageReceived', { message });
 *     },
 *     onMessageDelivered: ({ message }) => {
 *       console.log('onMessageDelivered', { message });
 *     },
 *     onMessageRead: (contactId, messageKey) => {
 *       console.log('onMessageRead', { contactId, messageKey });
 *     },
 *     onMessageSent: ({ message }) => {
 *       console.log('onMessageSent', { message });
 *     },
 *     onMessageSentUpdate: message => {
 *       console.log('onMessageSentUpdate', { sentMessageUpdate: message });
 *     },
 *     onMessageDeleted:  (contactId, messageKey) => {
 *       console.log('onMessageDeleted', { contactId, messageKey });
 *     },
 *     onConversationRead: userId => {
 *        console.log('onConversationRead', { userId });
 *     },
 *     onConversationDeleted: contactId => {
 *       console.log('onConversationDeleted', { contactId });
 *     },
 *     onUserActivated: message => {
 *       console.log('onUserActivated', { onUserActivated: message });
 *     },
 *     onUserConnect: message => {
 *       console.log('onUserConnect', { userConnected: message });
 *     },
 *     onUserOnlineStatus: (userId, isOnline, timestamp) => {
 *      console.log('onUserOnlineStatus', { userId, isOnline,  timestamp});
 *     },
 *     onTypingStatus: (userId, status) => {
 *       console.log('onTypingStatus', { userId, status});
 *     }
 *   }
 * });
 * ```
 *
 * ## HTML
 *
 * ```html
 * <!DOCTYPE html>
 * <head>
 *   <meta charset="utf-8" />
 *   <title>Development</title>
 *   <meta name="viewport" content="width=device-width,initial-scale=1" />
 *   <script src="https://websdk.applozic.com/sdk.js"></script>
 *   <script>
 *     var applozicClient = new alClient('YOUR-APPLOZIC-APP-ID', {
 *       events: {
 *         onMessageReceived: ({ message }) => {
 *           console.log('onMessageReceived', { message });
 *         },
 *         onMessageDelivered: ({ message }) => {
 *           console.log('onMessageDelivered', { message });
 *         },
 *         onMessageRead: (contactId, messageKey) => {
 *           console.log('onMessageRead', { contactId, messageKey });
 *         },
 *         onMessageSent: ({ message }) => {
 *           console.log('onMessageSent', { message });
 *         },
 *         onMessageSentUpdate: message => {
 *           console.log('onMessageSentUpdate', { sentMessageUpdate: message });
 *         },
 *         onMessageDeleted: (contactId, messageKey) => {
 *           console.log('onMessageDeleted', { contactId, messageKey });
 *         },
 *         onConversationRead: userId => {
 *           console.log('onConversationRead', { userId });
 *         },
 *         onConversationDeleted: contactId => {
 *           console.log('onConversationDeleted', { contactId });
 *         },
 *         onUserActivated: message => {
 *           console.log('onUserActivated', { onUserActivated: message });
 *         },
 *         onUserConnect: message => {
 *           console.log('onUserConnect', { userConnected: message });
 *         },
 *         onUserOnlineStatus: (userId, isOnline, timestamp) => {
 *           console.log('onUserOnlineStatus', { userId, isOnline, timestamp });
 *         },
 *         onTypingStatus: (userId, status) => {
 *           console.log('onTypingStatus', { userId, status });
 *         }
 *       }
 *     });
 *   </script>
 * </head>
 * <html>
 *   <body>
 *     <h1>My First Heading</h1>
 *     <p>My first paragraph.</p>
 *   </body>
 * </html>
 * ```
 *
 * ## Available APIs
 *
 * - {@link ContactsApi}
 * - {@link FilesApi}
 * - {@link GroupsApi}
 * - {@link MessagesApi}
 * - sendTypingStatus - {@link ApplozicClient.sendTypingStatus}
 */
export default class ApplozicClient extends BaseClientWithStore {
  public applozicSocket: ApplozicSocket | undefined = undefined;
  private options: ApplozicClientOptions | undefined = undefined;

  constructor(applicationId: string, options?: ApplozicClientOptions) {
    super(applicationId, options);
    this.options = options;
  }

  async postLogin(loginRes: LoginResult, accessToken: string) {
    await super.postLogin(loginRes, accessToken);
    if (this.options?.useSocket !== false) {
      this.applozicSocket = new ApplozicSocket({
        applicationId: this.applicationId,
        loginResult: loginRes,
        events: this.options?.events
      });
      this.applozicSocket.connect();
      this.subscribeToTypingStatus();
    }
  }

  async logout() {
    await super.logout();
    if (this.applozicSocket) {
      this.applozicSocket.disconnect();
    }
  }

  /**
   * Send typing status to a particular user
   *
   * Sample usage:
   *
   * ```typescript
   * applozicClient.sendTypingStatus('contact-id', true);
   * ```
   *
   * @param userId User ID of the user to send typing status to
   * @param isTyping True if the user is typing, false otherwise
   */
  public sendTypingStatus = (userId: string, isTyping: boolean) => {
    const topic = `/topic/typing-${this.applicationId}-${userId}`;
    const message = `${this.applicationId},${this.loginResult?.userId},${
      isTyping ? 1 : 0
    }`;
    this.applozicSocket?.sendMessage(topic, message);
  };

  private subscribeToTypingStatus = async () => {
    await this.applozicSocket?.connect();
    if (this.options?.events?.onTypingStatus && this.applozicSocket) {
      this.applozicSocket.subscribe(
        `/topic/typing-${this.applicationId}-${this.loginResult?.userId}`,
        stompMessage => {
          try {
            const [appId, userId, status] = stompMessage.body.split(',');
            this.options.events.onTypingStatus(userId, parseInt(status));
          } catch (e) {
            console.error('Error parsing message', stompMessage.body);
          }
        }
      );
    }
  };
}
