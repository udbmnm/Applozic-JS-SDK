export default interface FileMeta {
  blobKey?: string;
  contentType?: string;
  createdAt?: number;
  name?: string;
  size?: number;
  thumbnailUrl?: string;
}

export const contentTypeToFileType: { [key: string]: string } = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/bmp": "bmp",
  "image/tiff": "tif",
  "image/x-icon": "ico",
  "image/x-xbitmap": "xbm",
  "image/x-portable-pixmap": "ppm",
  "image/x-portable-graymap": "pgm",
  "image/x-portable-bitmap": "pbm",
  "image/x-portable-anymap": "pnm",
  "image/x-rgb": "rgb",
  "image/x-xpixmap": "xpm",
  "image/x-xwindowdump": "xwd",
  "image/x-xfig": "fig",
  "image/x-png": "png",
  "application/pdf": "pdf",
  "application/postscript": "ps",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.ms-excel": "xls",
  "application/vnd.ms-word": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "pptx",
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow":
    "ppsx",
  "application/vnd.openxmlformats-officedocument.presentationml.template":
    "potx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template":
    "xltx",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template":
    "dotx",
  "application/zip": "zip",
  "application/x-gzip": "gz",
  "application/x-tar": "tar",
  "application/x-bzip2": "bz2",
  "application/x-7z-compressed": "7z",
  "application/x-rar-compressed": "rar",
  "video/mp4": "mp4",
  "video/quicktime": "mov",
  "video/x-msvideo": "avi",
  "video/x-ms-wmv": "wmv",
  "video/x-flv": "flv",
  "video/x-matroska": "mkv",
  "video/webm": "webm",
  "video/ogg": "ogv",
  "video/x-ms-asf": "asf",
  "audio/mpeg": "mp3",
  "audio/x-wav": "wav",
  "audio/x-ms-wma": "wma",
  "audio/x-ms-wax": "wax",
  "audio/ogg": "ogg",
  "audio/x-flac": "flac",
  "audio/x-m4a": "m4a",
  "audio/x-aac": "aac",
  "audio/x-aiff": "aiff",
};
