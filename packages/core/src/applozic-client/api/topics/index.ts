import BaseClient from "../../base";
import closeTopicBuilder from "./close-topic";
import retrieveConversationBuilder from "./retrieve-conversation";
import sendMessageToTopicBuilder from "./send-message-topic";

const topicsApiBuilder = (client: BaseClient) => ({
  retrieveConversation: retrieveConversationBuilder(client),
  sendMessageToUser: sendMessageToTopicBuilder(client),
  closeTopic: closeTopicBuilder(client),
});

export default topicsApiBuilder;
