import AWS from 'aws-sdk';
const credentials = new AWS.SharedIniFileCredentials({ profile: 'applozic' });
AWS.config.credentials = credentials;
const cf = new AWS.CloudFront();

export const invalidateCloudfront = async (
  distributionId: string,
  paths: string[]
) => {
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
  return cf.createInvalidation(params).promise();
};
