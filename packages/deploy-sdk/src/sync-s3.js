const path = require('path');

const dotenv = require('dotenv');
const ENV = dotenv.config({
  path: path.join(__dirname, '../../../.env')
}).parsed;

const AWS = require('aws-sdk');
const fs = require('fs');
const glob = require('glob');

// const REGION = 'us-east-1';

var credentials = new AWS.SharedIniFileCredentials({ profile: 'applozic' });
AWS.config.credentials = credentials;
const s3 = new AWS.S3({ region: ENV.REGION });
const cf = new AWS.CloudFront();

// get filepaths in directory
// const getFilepaths = async (directory, exclude = [], include = []) => {

const getFiles = async (directory, exclude = [], include = []) => {
  const files = await new Promise((resolve, reject) => {
    glob(`${directory}/**/*`, { ignore: exclude }, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
  return files;
};

const readFile = async file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// common mime types for extensions
const mimeTypes = {
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

const uploadFileToS3 = async (filepath, bucket, key, ACL = 'public-read') => {
  const file = await readFile(filepath);
  // get file content type
  const contentType = filepath.split('.').pop();
  // get mime type

  const params = {
    Bucket: bucket,
    Key: key,
    Body: file,
    ContentType: mimeTypes[contentType] || 'text/plain',
    CacheControl: 'max-age=86400',
    ACL
  };
  await s3.putObject(params).promise();
};

// invalidate cloudfront cache
const invalidateCloudfront = async (distributionId, paths) => {
  const params = {
    DistributionId: distributionId,
    InvalidationBatch: {
      CallerReference: Date.now().toString(),
      Paths: {
        Quantity: paths.length,
        Items: paths
      }
    }
  };
  await cf.createInvalidation(params).promise();
};

// Upload directory to S3
const syncS3 = async (
  bucket,
  directory,
  prefix,
  exclude = [],
  include = []
) => {
  // Get list of files
  const files = await getFiles(directory, exclude, include);
  console.log('Files to upload', files);
  const keys = files.map(file =>
    path.join(prefix, file.replace(directory, ''))
  );

  await Promise.all(
    files.map(async (file, index) => {
      const key = path.join(prefix, file.replace(directory, ''));
      await uploadFileToS3(file, bucket, key);
      console.log('Success:', file, `${index + 1}/${files.length}`);
    })
  );
  console.log('Uploaded all files');
};

// Delete files with prefix in s3
const deleteS3 = async (bucket, prefix) => {
  const params = {
    Bucket: bucket,
    Prefix: prefix
  };
  const data = await s3.listObjectsV2(params).promise();
  const keys = data.Contents.map(item => item.Key);
  console.log('Deleting keys', keys);
  if (keys.length) {
    const deleteParams = {
      Bucket: bucket,
      Delete: {
        Objects: keys.map(key => ({ Key: key }))
      }
    };
    await s3.deleteObjects(deleteParams).promise();
  }
};

module.exports = {
  syncS3,
  invalidateCloudfront,
  deleteS3
};
