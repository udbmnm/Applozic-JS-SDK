import BaseClient, { METHODS } from '../base';
import LoginResult from '../models/LoginResult';

const ENDPOINT = '/v2/tab/initialize.page';

export interface LoginApi {
  (email: string, password: string): Promise<LoginResult>;
}

export interface PostLoginCallback {
  (loginRes: LoginResult, accessToken: string):
    | LoginResult
    | Promise<LoginResult>;
}

const loginBuilder = (applozicClient: BaseClient): LoginApi => {
  const loginApi: LoginApi = async (email, password) => {
    const response: LoginResult = await applozicClient.makeApiCall(
      METHODS.POST,
      ENDPOINT,
      {
        data: {
          userId: email,
          password,
          applicationId: applozicClient.applicationId
        }
      }
    );
    await applozicClient.postLogin(response, password);
    return response;
  };
  return loginApi;
};

export default loginBuilder;
