const express = require('express');
const cryptService = require('../services/cryptService');
const router = express.Router();


/**
 * @swagger
 * /api/crypt/encrypt-file:
 *   post:
 *     summary: Download a file from S3, (optionally encrypt), re-upload, and return a pre-signed download URL
 *     tags: [Crypt]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 description: S3 key of the file
 *               fileName:
 *                 type: string
 *                 description: File name
 *               fileType:
 *                 type: string
 *                 description: MIME type
 *     responses:
 *       200:
 *         description: Pre-signed download URL for the re-uploaded file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *       400:
 *         description: key, fileName, and fileType are required
 *       500:
 *         description: Server error
 */
router.post('/encrypt-file', async (req, res) => {
  const { key, fileName, fileType } = req.body;
  if (!key || !fileName || !fileType) return res.status(400).json({ error: 'key, fileName, and fileType are required' });
  const File = require('../models/File');
  try {
    const bucket = process.env.AWS_S3_BUCKET;
    const { getFileBufferFromS3, uploadFileToS3, getSignedDownloadUrl } = require('../services/s3Service');
    // Download file from S3
    const buffer = await getFileBufferFromS3(bucket, key);
    // (Optional) Encrypt buffer here if needed
    // Upload buffer back to S3 (to a new key, e.g., processed/)
    const processedKey = `processed/${Date.now()}_${fileName}`;
    await uploadFileToS3(buffer, processedKey, fileType, bucket);
    // Update the file's key in the DB
    await File.findOneAndUpdate({ key }, { key: processedKey, stage: 'processed', processingTimestamp: new Date() });
    // Generate pre-signed download URL
    const url = await getSignedDownloadUrl(bucket, processedKey);
    res.json({ url });
  } catch (err) {
    console.error('[POST /api/crypt/encrypt-file] Error:', err);
    // Mark file as failed in DB
    try {
      await File.findOneAndUpdate({ key }, { stage: 'failed', processingTimestamp: new Date() });
    } catch (dbErr) {
      console.error('[POST /api/crypt/encrypt-file] DB update error:', dbErr);
    }
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/crypt/decrypt-file:
 *   post:
 *     summary: Download a file from S3, (optionally decrypt), re-upload, and return a pre-signed download URL
 *     tags: [Crypt]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 description: S3 key of the file
 *               fileName:
 *                 type: string
 *                 description: File name
 *               fileType:
 *                 type: string
 *                 description: MIME type
 *     responses:
 *       200:
 *         description: Pre-signed download URL for the re-uploaded file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *       400:
 *         description: key, fileName, and fileType are required
 *       500:
 *         description: Server error
 */
router.post('/decrypt-file', async (req, res) => {
  const { key, fileName, fileType } = req.body;
  if (!key || !fileName || !fileType) return res.status(400).json({ error: 'key, fileName, and fileType are required' });
  const File = require('../models/File');
  try {
    const bucket = process.env.AWS_S3_BUCKET;
    const { getFileBufferFromS3, uploadFileToS3, getSignedDownloadUrl } = require('../services/s3Service');
    // Download file from S3
    const buffer = await getFileBufferFromS3(bucket, key);
    // (Optional) Decrypt buffer here if needed
    // Upload buffer back to S3 (to a new key, e.g., processed/)
    const processedKey = `processed/${Date.now()}_${fileName}`;
    await uploadFileToS3(buffer, processedKey, fileType, bucket);
    // Update the file's key in the DB
    await File.findOneAndUpdate({ key }, { key: processedKey, stage: 'processed', processingTimestamp: new Date() });
    // Generate pre-signed download URL
    const url = await getSignedDownloadUrl(bucket, processedKey);
    res.json({ url });
  } catch (err) {
    console.error('[POST /api/crypt/decrypt-file] Error:', err);
    // Mark file as failed in DB
    try {
      await File.findOneAndUpdate({ key }, { stage: 'failed', processingTimestamp: new Date() });
    } catch (dbErr) {
      console.error('[POST /api/crypt/decrypt-file] DB update error:', dbErr);
    }
    res.status(500).json({ error: err.message });
  }
});



