import BaseClient, { METHODS } from '../../base';

const ENDPOINT = '/rest/ws/user/update/password';

interface UpdateUserPasswordRes {
  status: string;
  generatedAt: number;
  response?: string;
}

export interface UpdateUserPasswordApi {
  (oldPassword: string, newPassword: string): Promise<UpdateUserPasswordRes>;
}

const updateUserPasswordBuilder = (
  applozicClient: BaseClient
): UpdateUserPasswordApi => {
  const updateUserPasswordApi: UpdateUserPasswordApi = async (
    oldPassword,
    newPassword
  ) => {
    const response: UpdateUserPasswordRes = await applozicClient.makeApiCall(
      METHODS.GET,
      ENDPOINT,
      {
        query: {
          oldPassword,
          newPassword
        },
        useAuth: true
      }
    );
    return response;
  };
  return updateUserPasswordApi;
};

export default updateUserPasswordBuilder;
