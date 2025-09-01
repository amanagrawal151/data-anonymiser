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
  console.log('[s3Service] Generating signed upload URL:', { bucket, filename, contentType, expires });
  const key = `uploads/${Date.now()}_${filename}`;
  const params = {
    Bucket: bucket,
    Key: key,
    Expires: expires,
    ContentType: contentType,
  };
  const url = await s3.getSignedUrlPromise('putObject', params);
  console.log('[s3Service] Signed URL generated:', { key });
  return { url, key };
}


/**
 * Generate a signed URL for downloading a file from S3
 * @param {string} bucket - S3 bucket name
 * @param {string} key - S3 object key
 * @param {number} expires - Expiry time in seconds (default: 300)
 * @returns {Promise<string>} - Signed download URL
 */
async function getSignedDownloadUrl(bucket, key, expires = 300) {
  console.log('[s3Service] Generating signed download URL:', { bucket, key, expires });
  const params = {
    Bucket: bucket,
    Key: key,
    Expires: expires,
  };
  const url = await s3.getSignedUrlPromise('getObject', params);
  console.log('[s3Service] Signed download URL generated:', { key });
  return url;
}


/**
 * Download a file from S3 and save it to a local path
 * @param {string} bucket - S3 bucket name
 * @param {string} key - File key in S3
 * @param {string} downloadPath - Local file path to save the file
 * @returns {Promise<string>} - Resolves to the local file path
 */
function downloadFileFromS3(bucket, key, downloadPath) {
  console.log('[s3Service] Downloading file from S3:', { bucket, key, downloadPath });
  return new Promise((resolve, reject) => {
    const params = { Bucket: bucket, Key: key };
    const fileStream = fs.createWriteStream(downloadPath);
    s3.getObject(params)
      .createReadStream()
      .on('error', (err) => {
        console.error('[s3Service] Error downloading from S3:', err);
        reject(err);
      })
      .pipe(fileStream)
      .on('error', (err) => {
        console.error('[s3Service] Error writing file:', err);
        reject(err);
      })
      .on('close', () => {
        console.log('[s3Service] File downloaded to:', downloadPath);
        resolve(downloadPath);
      });
  });
}

/**
 * Download a file from S3 and return its buffer (for in-memory processing)
 * @param {string} bucket - S3 bucket name
 * @param {string} key - File key in S3
 * @returns {Promise<Buffer>} - File data as a buffer
 */
async function getFileBufferFromS3(bucket, key) {
  console.log('[s3Service] Getting file buffer from S3:', { bucket, key });
  const params = { Bucket: bucket, Key: key };
  const data = await s3.getObject(params).promise();
  console.log('[s3Service] Buffer retrieved for key:', key);
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
  console.log('[s3Service] Uploading file to S3:', { bucket, key, contentType });
  const params = {
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  };
  const result = await s3.upload(params).promise();
  console.log('[s3Service] File uploaded to S3:', { key });
  return result;
}

module.exports = {
  getSignedUploadUrl,
  getSignedDownloadUrl,
  downloadFileFromS3,
  getFileBufferFromS3,
  uploadFileToS3,
};
