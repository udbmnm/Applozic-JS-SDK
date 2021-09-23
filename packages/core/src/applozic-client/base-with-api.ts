import BaseClient from './base';
import loginBuilder from './api/login';
import contactsApiBuilder from './api/contacts';
import filesApiBuilder from './api/files';
import messagesApiBuilder from './api/messages';
import groupsApiBuilder from './api/groups';
import topicsApiBuilder from './api/topics';

export default class BaseClientWithApi extends BaseClient {
  constructor(applicationId: string) {
    super(applicationId);
  }

  public login = loginBuilder(this);

  public contacts = contactsApiBuilder(this);

  public files = filesApiBuilder(this);

  public groups = groupsApiBuilder(this);

  public messages = messagesApiBuilder(this);

  public topics = topicsApiBuilder(this);
}
