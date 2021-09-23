import { agent } from 'superagent';
import type { Response } from 'superagent';
import { encode } from 'base-64';
import AppConfig from './config';
import LoginResult from './models/LoginResult';

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
export default class BaseClient {
  public applicationId: string;
  public isLoggedIn: boolean = false;
  public authHeaders = {
    'Application-Key': '',
    Authorization: '',
    'Device-Key': '',
    'Application-User': '',
    'X-Authorization': '',
    'Access-Token': '',
    'App-Module-Name': '',
    'UserId-Enabled': false
  };
  public loginResult: LoginResult | null = null;
  public accessToken: string | null = null;

  constructor(applicationId: string) {
    this.applicationId = applicationId;
  }

  private setAuthHeaders = (loginRes: LoginResult, accessToken: string) => {
    this.authHeaders['Application-Key'] = this.applicationId;
    this.authHeaders['Device-Key'] = loginRes.deviceKey;

    const authCode = encode(
      unescape(encodeURIComponent(`${loginRes.userId}:${loginRes.deviceKey}`))
    );
    this.authHeaders['Authorization'] = 'Basic ' + authCode;
    this.authHeaders['Application-User'] = 'Basic ' + authCode;

    this.authHeaders['X-Authorization'] = loginRes.authToken;

    this.authHeaders['Access-Token'] = accessToken;
    // this.authHeaders['App-Module-Name'] = ''; // TODO check about this header
    this.authHeaders['UserId-Enabled'] = true;
  };

  private getAgent = (useAuth: boolean) => {
    const request = agent();

    if (useAuth) {
      request.set(this.authHeaders);
    }
    return request;
  };

  async setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  async postLogin(loginRes: LoginResult, accessToken: string) {
    this.loginResult = loginRes;
    this.isLoggedIn = true;
    this.setAuthHeaders(loginRes, accessToken);
    await this.setAccessToken(accessToken);
  }

  async logout() {
    this.loginResult = null;
    this.accessToken = null;
  }

  public makeApiCall = async (
    method: METHODS,
    endpoint: string,
    options?: {
      /** Override the default API host */
      host?: string;
      data?: any;
      query?: { [key: string]: string | number };
      useAuth?: boolean;
      json?: boolean;
    }
  ): Promise<any> => {
    const useJSON = options?.json ?? true;
    let response: Response;

    const request = this.getAgent(!!options?.useAuth);

    if (options?.query) {
      request.query(options.query);
    }

    if (useJSON) {
      request.set('Accept', 'application/json');
    }

    try {
      if (method === METHODS.GET) {
        response = await request.get(
          `${options?.host ?? AppConfig.APPLOZIC_HOST}${endpoint}`
        );
      } else if (method === METHODS.POST) {
        response = await request
          .post(`${AppConfig.APPLOZIC_HOST}${endpoint}`)
          .send(options.data);
      }

      if (useJSON) {
        return response.body;
      }
      return response.text;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  public uploadFile = async (
    completeUrl: string,
    keyName: string,
    file: File,
    options?: {
      /** Override the default API host */
      host?: string;
      query?: { [key: string]: string | number };
      useAuth?: boolean;
    }
  ): Promise<any> => {
    let response: Response;

    const request = this.getAgent(!!options?.useAuth);

    if (options?.query) {
      request.query(options.query);
    }

    try {
      response = await request.post(completeUrl).attach(keyName, file);

      return response.body;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
