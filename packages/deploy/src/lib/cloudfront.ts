import AWS from 'aws-sdk';
const credentials = new AWS.SharedIniFileCredentials({ profile: 'applozic' });
AWS.config.credentials = credentials;
const cf = new AWS.CloudFront();

export const invalidateCloudfront = async (
  distributionId: string,
  paths: string[]
) => {
  paths = paths.filter(path => path.indexOf('~') < 0); // Exclude these files
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
  const result = await cf.createInvalidation(params).promise();
  console.log(
    `Invalidated Cloudfront\n\tInvalidation ID:\t${result?.Invalidation?.Id}`
  );
  return result;
};
