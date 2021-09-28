import BaseClient, { METHODS } from '../../base';
import FileMeta from '../../models/FileMeta';

const GET_UPLOAD_URL_ENDPOINT = '/rest/ws/aws/file/url';

/**
 * For usage, see {@link FilesApi.upload}
 */
export interface UploadApi {
  (file: File): Promise<FileMeta>;
}

const uploadBuilder = (applozicClient: BaseClient): UploadApi => {
  const uploadApi: UploadApi = async (file: File) => {
    const uploadUrl = await applozicClient.makeApiCall(
      METHODS.GET,
      GET_UPLOAD_URL_ENDPOINT,
      {
        host: 'https://applozic.appspot.com',
        query: {
          data: `${Date.now()}`
        },
        useAuth: false,
        json: false
      }
    );

    const uploadResult = await applozicClient.uploadFile(
      uploadUrl,
      'files[]',
      file
    );

    return uploadResult.fileMeta;
  };
  return uploadApi;
};

export default uploadBuilder;
