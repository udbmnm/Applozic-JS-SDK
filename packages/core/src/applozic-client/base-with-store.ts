import ApplozicStore, { CONFIG_STORE } from '@applozic/local-store';
import BaseClientWithApi from './base-with-api';
import LoginResult from './models/LoginResult';

const { LOGIN_RESULT, GRACEFUL_LOGOUT, ACCESS_TOKEN } = CONFIG_STORE.keys;

export enum METHODS {
  GET = 'GET',
  POST = 'POST'
}

export interface BaseResponse<T> {
  status: 'success' | 'error';
  generatedAt: number;
  response: T;
  errorResponse?: {
    errorCode: string;
    description: string;
    displayMessage: string;
  }[];
}

export interface BaseClientWithStoreOptions {
  useStore?: boolean;
}

export default class BaseClientWithStore extends BaseClientWithApi {
  private store: ApplozicStore | null = null;
  private initializedPromise: Promise<void> | null = null;

  constructor(applicationId: string, options?: BaseClientWithStoreOptions) {
    super(applicationId);
    if (options?.useStore !== false) {
      this.store = new ApplozicStore(CONFIG_STORE.name);
    }
  }

  async setAccessToken(accessToken: string) {
    await super.setAccessToken(accessToken);
    if (this.store) {
      await this.store.setItem(ACCESS_TOKEN, accessToken);
    }
  }

  async init() {
    if (this.store === null) {
      return;
    }
    if (this.initializedPromise) {
      return this.initializedPromise;
    }
    this.initializedPromise = new Promise<void>(async resolve => {
      if (this.store) {
        try {
          const gracefulLogout = await this.store.getItem(GRACEFUL_LOGOUT);
          if (gracefulLogout) {
            await this.store.removeItem(LOGIN_RESULT);
            await this.store.removeItem(GRACEFUL_LOGOUT);
          }
          const loginRes = await this.store.getItem<LoginResult>(LOGIN_RESULT);
          const accessToken = await this.store.getItem<string>(ACCESS_TOKEN);
          if (loginRes && accessToken) {
            await this.postLogin(loginRes, accessToken);
          } else {
            // clear the store if either is missing
            await this.store.clear();
          }
        } catch (e) {}
      }
      resolve();
    });
    return this.initializedPromise;
  }

  async postLogin(loginRes: LoginResult, accessToken: string) {
    await super.postLogin(loginRes, accessToken);
    if (this.store) {
      await this.store.setItem(LOGIN_RESULT, loginRes);

      await this.store.setItem(ACCESS_TOKEN, accessToken);
    }
  }

  async logout() {
    await super.logout();
    if (this.store) {
      await this.store.setItem(GRACEFUL_LOGOUT, 'logging_out');
      await this.store.removeItem(LOGIN_RESULT);
      await this.store.removeItem(GRACEFUL_LOGOUT);
    }
  }
}
