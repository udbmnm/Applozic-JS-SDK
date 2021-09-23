export default interface FileMeta {
  blobKey: string;
  contentType: string;
  createdAt?: number;
  name: string;
  size: number;
  thumbnailUrl?: string;
}
