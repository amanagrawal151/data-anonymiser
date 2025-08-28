const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
// Configure AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

/**
 * Generate a signed URL for uploading a file to S3
 * @param {string} bucket - S3 bucket name
 * @param {string} key - File key (path/filename)
 * @param {string} contentType - MIME type of the file
 * @param {number} expires - Expiry time in seconds
 * @returns {Promise<string>} - Signed URL
 */
function getSignedUploadUrl(bucket, key, contentType, expires = 300) {
  const params = {
    Bucket: bucket,
    Key: key,
    Expires: expires,
    ContentType: contentType,
  };
  return s3.getSignedUrlPromise('putObject', params);
}




/**
 * Download a file from S3 and save it to a local path
 * @param {string} bucket - S3 bucket name
 * @param {string} key - File key in S3
 * @param {string} downloadPath - Local file path to save the file
 * @returns {Promise<string>} - Resolves to the local file path
 */
function downloadFileFromS3(bucket, key, downloadPath) {
  return new Promise((resolve, reject) => {
    const params = { Bucket: bucket, Key: key };
    const fileStream = fs.createWriteStream(downloadPath);
    s3.getObject(params)
      .createReadStream()
      .on('error', reject)
      .pipe(fileStream)
      .on('error', reject)
      .on('close', () => resolve(downloadPath));
  });
}

/**
 * Download a file from S3 and return its buffer (for in-memory processing)
 * @param {string} bucket - S3 bucket name
 * @param {string} key - File key in S3
 * @returns {Promise<Buffer>} - File data as a buffer
 */
async function getFileBufferFromS3(bucket, key) {
  const params = { Bucket: bucket, Key: key };
  const data = await s3.getObject(params).promise();
  return data.Body;
}

module.exports = {
  getSignedUploadUrl,
  downloadFileFromS3,
  getFileBufferFromS3,
};
