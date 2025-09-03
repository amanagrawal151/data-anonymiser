const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const upload = multer({ dest: path.join(__dirname, '../tmp') });

const cryptService = require('../services/cryptService');

/**
 * @swagger
 * /api/crypt/encrypt-file-upload:
 *   post:
 *     summary: Encrypt an uploaded file and return the encrypted file for download
 *     tags: [Crypt]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to encrypt
 *     responses:
 *       200:
 *         description: Encrypted file for download
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Server error
 */
router.post('/encrypt-file-upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const result = await cryptService.encryptFile(file.path);

    // Use original extension for download
    const originalExt = path.extname(file.originalname);
       const downloadName = file.originalname.replace(originalExt, '') + '_encrypted' + originalExt;;
    res.download(result.encryptedFilePath, downloadName, err => {
      fs.unlink(file.path, () => {});
      fs.unlink(result.encryptedFilePath, () => {});
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/crypt/decrypt-file-upload:
 *   post:
 *     summary: Decrypt an uploaded file and return the decrypted file for download
 *     tags: [Crypt]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to decrypt
 *     responses:
 *       200:
 *         description: Decrypted file for download
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Server error
 */
router.post('/decrypt-file-upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const result = await cryptService.decryptFile(file.path);

    // Use original extension for download
    const originalExt = path.extname(file.originalname);
    const downloadName = file.originalname.replace(originalExt, '') + '_decrypted' + originalExt;
    res.download(result.decryptedFilePath, downloadName, err => {
      fs.unlink(file.path, () => {});
      fs.unlink(result.decryptedFilePath, () => {});
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/crypt/file-encryption:
 *   post:
 *     summary: Encrypt a local file using the cryptService
 *     tags: [Crypt]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filepath:
 *                 type: string
 *                 description: Absolute path to the file to encrypt
 *     responses:
 *       200:
 *         description: Encryption result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 colResult:
 *                   type: array
 *                   items:
 *                     type: string
 *                 encryptedFilePath:
 *                   type: string
 *       400:
 *         description: Filepath is required or file does not exist
 *       500:
 *         description: Server error
 */
router.post('/file-encryption', async (req, res) => {
  const { filepath } = req.body;
  if (!filepath || typeof filepath !== 'string') {
    return res.status(400).json({ error: 'filepath is required and must be a string' });
  }
  if (!fs.existsSync(filepath)) {
    return res.status(400).json({ error: 'File does not exist at the provided path' });
  }
  try {
    const result = await cryptService.encryptFile(filepath);
    res.json(result);
  } catch (err) {
    console.error('[POST /api/crypt/file-encryption] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/crypt/file-decryption:
 *   post:
 *     summary: Decrypt a local file using the cryptService
 *     tags: [Crypt]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filepath:
 *                 type: string
 *                 description: Absolute path to the file to decrypt
 *     responses:
 *       200:
 *         description: Decryption result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 decryptedColumns:
 *                   type: array
 *                   items:
 *                     type: string
 *                 decryptedFilePath:
 *                   type: string
 *       400:
 *         description: Filepath is required or file does not exist
 *       500:
 *         description: Server error
 */
router.post('/file-decryption', async (req, res) => {
  const { filepath } = req.body;
  if (!filepath || typeof filepath !== 'string') {
    return res.status(400).json({ error: 'filepath is required and must be a string' });
  }
  if (!fs.existsSync(filepath)) {
    return res.status(400).json({ error: 'File does not exist at the provided path' });
  }
  try {
    const result = await cryptService.decryptFile(filepath);
    res.json(result);
  } catch (err) {
    console.error('[POST /api/crypt/file-decryption] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

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
  const { key, fileName, fileType, userId } = req.body;
  if (!key || !fileName || !fileType) return res.status(400).json({ error: 'key, fileName, and fileType are required' });
  const File = require('../models/File');
  const statsService = require('../services/statsService');
  const notificationService = require('../services/notificationService');
  try {
    const bucket = process.env.AWS_S3_BUCKET;
    const { getFileBufferFromS3, uploadFileToS3, getSignedDownloadUrl } = require('../services/s3Service');
    // Download file from S3
    const buffer = await getFileBufferFromS3(bucket, key);
    // Save buffer to a temp file
    const tempFilePath = path.join(__dirname, '..', 'tmp', `${Date.now()}_${fileName}`);
    fs.writeFileSync(tempFilePath, buffer);
    // Encrypt the file
    const { encryptedFilePath } = await cryptService.encryptFile(tempFilePath);
    // Read encrypted file buffer
    const encryptedBuffer = fs.readFileSync(encryptedFilePath);
    // Upload encrypted buffer back to S3 (to a new key, e.g., processed/)
    const processedKey = `processed/${Date.now()}_${path.basename(encryptedFilePath)}`;
    await uploadFileToS3(encryptedBuffer, processedKey, fileType, bucket);
    // Update the file's key in the DB
    await File.findOneAndUpdate({ key }, { key: processedKey, stage: 'success', processingTimestamp: new Date() });
    // Update stats for success file
    await statsService.updateStatsForFileOutcome(userId, fileName, 'success');
    // Create notification for success
    await notificationService.createCryptNotification({
      user:  "68b36f80cb1d579c7f9f2e5a" || userId,
      fileType,
      cryptForm: 'encryption',
      success: true,
      fileName
    });
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
    // Update stats for failed file
    await statsService.updateStatsForFileOutcome(userId, fileName, 'failure');
    // Create notification for failure
    await notificationService.createCryptNotification({
      user: "68b36f80cb1d579c7f9f2e5a" || userId,
      fileType,
      cryptForm: 'encryption',
      success: false,
      fileName
    });
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
  const { key, fileName, fileType, userId } = req.body;
  if (!key || !fileName || !fileType) return res.status(400).json({ error: 'key, fileName, and fileType are required' });
  const File = require('../models/File');
  const statsService = require('../services/statsService');
  const notificationService = require('../services/notificationService');
  try {
    const bucket = process.env.AWS_S3_BUCKET;
    const { getFileBufferFromS3, uploadFileToS3, getSignedDownloadUrl } = require('../services/s3Service');
    // Download file from S3
    const buffer = await getFileBufferFromS3(bucket, key);
    // Save buffer to a temp file
    const tempFilePath = path.join(__dirname, '..', 'tmp', `${Date.now()}_${fileName}`);
    fs.writeFileSync(tempFilePath, buffer);
    // Decrypt the file
    const { decryptedFilePath } = await cryptService.decryptFile(tempFilePath);
    // Read decrypted file buffer
    const decryptedBuffer = fs.readFileSync(decryptedFilePath);
    // Upload decrypted buffer back to S3 (to a new key, e.g., processed/)
    const processedKey = `processed/${Date.now()}_${path.basename(decryptedFilePath)}`;
    await uploadFileToS3(decryptedBuffer, processedKey, fileType, bucket);
    // Update the file's key in the DB
    await File.findOneAndUpdate({ key }, { key: processedKey, stage: 'success', processingTimestamp: new Date() });
    // Update stats for success file
    await statsService.updateStatsForFileOutcome(userId, fileName, 'success');
    // Create notification for success
    await notificationService.createCryptNotification({
      user: "68b36f80cb1d579c7f9f2e5a" || userId,
      fileType,
      cryptForm: 'decryption',
      success: true,
      fileName
    });
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
    // Update stats for failed file
    await statsService.updateStatsForFileOutcome(userId, fileName, 'failure');
    // Create notification for failure
    await notificationService.createCryptNotification({
      user: "68b36f80cb1d579c7f9f2e5a" || userId,
      fileType,
      cryptForm: 'decryption',
      success: false,
      fileName
    });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;



