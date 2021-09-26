import fs from 'fs';
import glob from 'glob';

// common mime types for extensions
export const MIME_TYPES: { [key: string]: string } = {
  html: 'text/html',
  htm: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  txt: 'text/plain',
  ico: 'image/x-icon',
  json: 'application/json'
};

export const getFiles = async (directory: string) =>
  new Promise<string[]>((resolve, reject) => {
    glob(`${directory}/**/*`, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });

export const readFile = async (filepath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
