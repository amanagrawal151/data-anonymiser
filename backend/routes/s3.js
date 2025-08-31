
const express = require('express');
const router = express.Router();

const { getSignedUploadUrl } = require('../services/s3Service');
const fileService = require('../services/fileService');
const mongoose = require('mongoose');


/**
 * @swagger
 * /api/s3/sign-url:
 *   post:
 *     summary: Generate a signed S3 upload URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filename:
 *                 type: string
 *               contentType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Signed URL generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                 key:
 *                   type: string
 */
router.post('/sign-url', async (req, res) => {
  try {
    const { filename, contentType, fileSize, userId } = req.body;
    if (!filename || !contentType || !fileSize || !userId) {
      return res.status(400).json({ error: 'filename, contentType, fileSize, and userId are required' });
    }
    const bucket = process.env.AWS_S3_BUCKET;
    const { url, key } = await getSignedUploadUrl(bucket, filename, contentType);

    // Save file document in DB
    await fileService.createFile({
      user: mongoose.Types.ObjectId(userId),
      fileName: filename,
      fileType: contentType,
      fileSize,
      key,
      stage: 'uploaded',
    });

    res.json({ url, key });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate signed URL' });
  }
});


/**
 * @swagger
 * /api/s3/download-to-local:
 *   post:
 *     summary: Download a file from S3 to local backend storage
 *     tags: [S3]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileId:
 *                 type: string
 *                 description: The ID of the file document
 *     responses:
 *       200:
 *         description: File downloaded to local storage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 localPath:
 *                   type: string
 *       400:
 *         description: fileId is required
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 */
// POST /api/s3/download-to-local
router.post('/download-to-local', async (req, res) => {
  try {
    const { fileId } = req.body;
    if (!fileId) return res.status(400).json({ error: 'fileId is required' });

    const File = require('../models/File');
    const fileDoc = await File.findById(fileId);
    if (!fileDoc) return res.status(404).json({ error: 'File not found' });

    const localDir = require('path').join(__dirname, '../local_files');
    if (!require('fs').existsSync(localDir)) require('fs').mkdirSync(localDir);
    const localPath = require('path').join(localDir, fileDoc.fileName);

    const { downloadFileFromS3 } = require('../services/s3Service');
    await downloadFileFromS3(process.env.AWS_S3_BUCKET, fileDoc.key, localPath);

    res.json({ message: 'File downloaded to local storage', localPath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
