import { GroupTypes } from '../../models/Group';
import BaseClient, { BaseResponse, METHODS } from '../../base';

const ENDPOINT = '/rest/ws/conversation/v2/id';

interface RetrieveConversationRes {
  id: number;
  clientGroupId: string;
  name: string;
  adminId: string;
  // [ List of members userIds]
  membersId: string[];
  removedMembersId: string[];
  unreadCount: number;
  type: GroupTypes;
  conversationPxy: {
    // pass as "conversationId" in request body for topic based send message
    id: number;
    // Topic id of the conversation
    topicId: string;
    // Topic Detail for the conversation
    topicDetail: string;
    // userId of User with whom topic based chat initiated
    userId: string;
    // "(true/false) if the conversation is created or not in this api";
    created: boolean;
    //"(true/false) if the conversation is closed";
    closed: boolean;
    // "userId who is initiating topic based chat"
    senderUserName: string;
    // "status of the conversation"
    status: string;
    // "(Int) Group id of the respected group"; // pass as "groupId"  in request body for topic based send message
    groupId: number;
  };
  // "Group image Url"
  imageUrl: string;
  createdAtTime: number;
  // "group user count"
  userCount: number;
}

interface RetrieveConversationReq {
  topicId: string;
  topicDetail: { [key: string]: string | number };
  userId?: string;
  groupId?: string;
  status?: 'new' | 'open' | 'default';
}

export interface RetrieveConversationApi {
  (messageRequest: RetrieveConversationReq): Promise<
    BaseResponse<RetrieveConversationRes>
  >;
}

const retrieveConversationBuilder = (
  applozicClient: BaseClient
): RetrieveConversationApi => {
  const retrieveConversationApi: RetrieveConversationApi = async ({
    topicDetail,
    ...rest
  }) => {
    const response: BaseResponse<RetrieveConversationRes> =
      await applozicClient.makeApiCall(METHODS.POST, ENDPOINT, {
        data: { topicDetail: JSON.stringify(topicDetail), ...rest },
        useAuth: true
      });
    return response;
  };
  return retrieveConversationApi;
};

export default retrieveConversationBuilder;
