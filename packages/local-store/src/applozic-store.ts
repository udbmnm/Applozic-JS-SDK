import { createInstance, INDEXEDDB, WEBSQL, LOCALSTORAGE } from 'localforage';

export default class ApplozicStore {
  private store: LocalForage;
  constructor(name: string) {
    this.store = createInstance({
      driver: [INDEXEDDB, WEBSQL, LOCALSTORAGE],
      name
    });
  }

  public getItem = async <T>(key: string) =>
    (await this.store.getItem(key)) as T;

  public setItem = async <T>(key: string, value: T) =>
    this.store.setItem(key, value);

  public removeItem = async (key: string) => this.store.removeItem(key);

  public clear = async () => this.store.clear();
}
