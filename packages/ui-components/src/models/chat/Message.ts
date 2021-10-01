import { FileMeta, MessageContentType } from "@applozic/core-sdk";
import MessageStatus from "./MessageStatus";
import Reaction from "./Reaction";

interface Message {
  /**
   * An unique identifier for the message
   */
  key: string;
  /**
   * The text content of the message
   */
  messageText: string;
  /**
   *  Is this message sent by the logged in user?
   */
  isReply: boolean;
  /**
   * The timestamp of
   */
  timeStamp: Date;
  /**
   * The userId of the sender
   */
  fromUserId: string;
  /**
   * The
   */
  status?: MessageStatus;
  /**
   * UNUSED: An array of reactions for a given message
   */
  reactions?: Array<Reaction>;
  /**
   * The metadata of an attached file refer to FileMeta from the @applozic/core-sdk
   */
  file?: FileMeta;
  /**
   * A key value pair for sending specific metadata for a message to handle custom use-cases.
   */
  metadata?: { [key: string]: string };
  /**
   * The contentType of a message which defines the overall behaviour
   */
  contentType?: MessageContentType;
}

export default Message;
