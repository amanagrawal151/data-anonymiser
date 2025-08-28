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
 * @param {string} filename - Original filename
 * @param {string} contentType - MIME type of the file
 * @param {number} expires - Expiry time in seconds
 * @returns {Promise<{url: string, key: string}>} - Signed URL and S3 key
 */
async function getSignedUploadUrl(bucket, filename, contentType, expires = 300) {
  const key = `uploads/${Date.now()}_${filename}`;
  const params = {
    Bucket: bucket,
    Key: key,
    Expires: expires,
    ContentType: contentType,
  };
  const url = await s3.getSignedUrlPromise('putObject', params);
  return { url, key };
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


/**
 * Upload a file buffer to S3
 * @param {Buffer} buffer - File buffer
 * @param {string} key - S3 object key
 * @param {string} contentType - MIME type
 * @param {string} [bucket] - S3 bucket name (optional, defaults to env)
 * @param {object} [options] - Optional S3 config overrides (e.g., endpoint)
 * @returns {Promise<object>} - S3 upload response
 */
async function uploadFileToS3(buffer, key, contentType, bucket = process.env.AWS_S3_BUCKET, options = {}) {
  // const s3Config = {
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //   region: process.env.AWS_REGION,
  //   ...options,
  // };
  // if (process.env.AWS_S3_ENDPOINT) {
  //   s3Config.endpoint = process.env.AWS_S3_ENDPOINT;
  //   s3Config.s3ForcePathStyle = true;
  // }
  // const s3Instance = new AWS.S3(s3Config);
  const params = {
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  };
  return await s3.upload(params).promise();
}

module.exports = {
  getSignedUploadUrl,
  downloadFileFromS3,
  getFileBufferFromS3,
  uploadFileToS3,
};
