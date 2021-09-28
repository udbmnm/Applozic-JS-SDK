import BaseClient from '../../base';
import uploadBuilder, { UploadApi } from './upload';

export interface FilesApi {
  /**
   * This is a helper method to upload a file to Applozic server so that it can be used as an attachment.
   *
   * https://docs.applozic.com/reference/messages#send-message-with-attachment
   *
   * To send a message, see {@link MessagesApi.send}
   *
   * Sample usage:
   * ```typescript
   * const fileMeta = await applozicClient.files.upload(file);
   * console.log({ fileMeta });
   * ```
   */
  upload: UploadApi;
}

const filesApiBuilder = (client: BaseClient): FilesApi => ({
  upload: uploadBuilder(client)
});

export default filesApiBuilder;
