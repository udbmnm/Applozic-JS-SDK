import { exec } from 'child_process';
import fs from 'fs';
import crypto from 'crypto';
import glob from 'glob';
import path from 'path';

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

export const getDirHash = (dirname: string, exclude: string[] = []) =>
  new Promise((resolve, reject) => {
    // TODO: Improve exclude pattern
    // Ideally the tar should ignore all ignored in .gitignore
    console.log('Generating hash for ui-components');
    const filename = 'compressed.tgz';
    const excludeString = exclude
      .map(item => `--exclude='./${item}'`)
      .join(' ');

    exec(
      `tar ${excludeString} -cf ${filename} *`,
      {
        cwd: dirname
      },
      async err => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        const filepath = path.join(dirname, filename);
        const hash = await calculateHash(filepath);
        console.log(`Hash generated for ${dirname}:`, hash);
        fs.unlinkSync(filepath);
        resolve(hash);
      }
    );
  });

export const calculateHash = (file: string) =>
  new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha1');
    const rs = fs.createReadStream(file);
    rs.on('error', reject);
    rs.on('data', chunk => hash.update(chunk));
    rs.on('end', () => resolve(hash.digest('hex')));
  });
