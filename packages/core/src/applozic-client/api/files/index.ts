import BaseClient from '../../base';
import uploadBuilder from './upload';

const messagesApiBuilder = (client: BaseClient) => ({
  upload: uploadBuilder(client)
});

export default messagesApiBuilder;
