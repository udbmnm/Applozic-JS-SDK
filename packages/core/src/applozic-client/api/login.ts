import BaseClient, { METHODS } from '../base';
import LoginResult from '../models/LoginResult';

const ENDPOINT = '/v2/tab/initialize.page';

/**
 * Sample usage:
 * 
 * ```typescript
 * const loginResult = await applozicClient.login('user-id', 'password');
 * ```
 * 
 * For client initialization, see {@link ApplozicClient}
 */
export interface LoginApi {
  (userId: string, password: string): Promise<LoginResult>;
}

// export interface PostLoginCallback {
//   (loginRes: LoginResult, accessToken: string): Promise<LoginResult>;
// }

const loginBuilder = (applozicClient: BaseClient): LoginApi => {
  const loginApi: LoginApi = async (email, password) => {
    const response: LoginResult | string = await applozicClient.makeApiCall(
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
    if (typeof response === 'string') {
      if (response === 'INVALID_PASSWORD') {
        throw new Error('Invalid password');
      } else {
        throw new Error(`Login Failure: ${response}`);
      }
    } else {
      await applozicClient.postLogin(response, password);
      return response;
    }
  };
  return loginApi;
};

export default loginBuilder;
