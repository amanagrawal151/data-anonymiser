const express = require('express');
const router = express.Router();

const { getSignedUploadUrl } = require('../services/s3Service');
const fileService = require('../services/fileService');
const mongoose = require('mongoose');


/**
 * @swagger
 * /api/s3/sign-url:
 *   post:
 *     summary: Generate a signed S3 upload URL and create a file record
 *     tags: [S3]
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
 *               fileSize:
 *                 type: number
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Signed URL generated and file record created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                 key:
 *                   type: string
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/sign-url', async (req, res) => {
  try {
    console.log('[POST /api/s3/sign-url] Request body:', req.body);
    const { filename, contentType, fileSize, userId } = req.body;
    if (!filename || !contentType || !fileSize || !userId) {
      console.warn('[POST /api/s3/sign-url] Missing required fields');
      return res.status(400).json({ error: 'filename, contentType, fileSize, and userId are required' });
    }
    const bucket = process.env.AWS_S3_BUCKET;
    let url, key;
    try {
      const result = await getSignedUploadUrl(bucket, filename, contentType);
      url = result.url;
      key = result.key;
      console.log(`[POST /api/s3/sign-url] Generated signed URL for file: ${filename}, key: ${key}`);
    } catch (s3Err) {
      console.error('[POST /api/s3/sign-url] S3 signed URL generation failed:', s3Err);
      // Create file record with failed status
      let failedFileDoc;
      try {
        failedFileDoc = await fileService.createFile({
          user: "68b36f80cb1d579c7f9f2e5a" || userid,
          fileName: filename,
          fileType: contentType,
          fileSize,
          key: null,
          stage: 'failed',
        });
        console.log(`[POST /api/s3/sign-url] File record created with failed status for user: ${"68b36f80cb1d579c7f9f2e5a" || userid}`);
      } catch (fileErr) {
        console.error('[POST /api/s3/sign-url] File creation for failed S3 URL also failed:', fileErr);
      }
      // Update stats for failed file
      try {
        const statsService = require('../services/statsService');
        const stats = await statsService.getStatsByUser("68b36f80cb1d579c7f9f2e5a" || userid);
        const fileTypeKey = (contentType.toLowerCase().includes('csv')) ? 'csv'
          : (contentType.toLowerCase().includes('excel') || contentType.toLowerCase().includes('xlsx')) ? 'excel'
          : (contentType.toLowerCase().includes('parquet')) ? 'parquet'
          : null;
        if (fileTypeKey) {
          const update = {
            $inc: {
              'fileStatusStats.failure': 1
            }
          };
          if (stats) {
            await statsService.updateStats(stats._id, update);
            console.log(`[POST /api/s3/sign-url] Stats updated for failed file for user: ${"68b36f80cb1d579c7f9f2e5a" || userid}`);
          } else {
            // Create new stats document for user
            const newStats = {
              user: "68b36f80cb1d579c7f9f2e5a" || userid,
              fileStatusStats: { failure: 1 },
            };
            await statsService.createStats(newStats);
            console.log(`[POST /api/s3/sign-url] Stats created for failed file for user: ${"68b36f80cb1d579c7f9f2e5a" || userid}`);
          }
        }
      } catch (statsErr) {
        console.error('[POST /api/s3/sign-url] Stats update for failed file failed:', statsErr);
      }
      return res.status(500).json({ error: 'Failed to generate signed S3 upload URL' });
    }

    // Save file document in DB
    let fileDoc;
    try {
      fileDoc = await fileService.createFile({
        user: "68b36f80cb1d579c7f9f2e5a" || userid,
        fileName: filename,
        fileType: contentType,
        fileSize,
        key,
        stage: 'uploaded',
      });
      console.log(`[POST /api/s3/sign-url] File record created for user: ${"68b36f80cb1d579c7f9f2e5a" || userid}`);
    } catch (fileErr) {
      console.error('[POST /api/s3/sign-url] File creation failed:', fileErr);
      // Update stats for failed file
      try {
        const statsService = require('../services/statsService');
        const stats = await statsService.getStatsByUser("68b36f80cb1d579c7f9f2e5a" || userid);
        const fileTypeKey = (contentType.toLowerCase().includes('csv')) ? 'csv'
          : (contentType.toLowerCase().includes('excel') || contentType.toLowerCase().includes('xlsx')) ? 'excel'
          : (contentType.toLowerCase().includes('parquet')) ? 'parquet'
          : null;
        if (fileTypeKey) {
          const update = {
            $inc: {
              'fileStatusStats.failure': 1
            }
          };
          if (stats) {
            await statsService.updateStats(stats._id, update);
            console.log(`[POST /api/s3/sign-url] Stats updated for failed file for user: ${"68b36f80cb1d579c7f9f2e5a" || userid}`);
          } else {
            // Create new stats document for user
            const newStats = {
              user: "68b36f80cb1d579c7f9f2e5a" || userid,
              fileStatusStats: { failure: 1 },
            };
            await statsService.createStats(newStats);
            console.log(`[POST /api/s3/sign-url] Stats created for failed file for user: ${"68b36f80cb1d579c7f9f2e5a" || userid}`);
          }
        }
      } catch (statsErr) {
        console.error('[POST /api/s3/sign-url] Stats update for failed file failed:', statsErr);
      }
      return res.status(500).json({ error: 'Failed to create file record' });
    }

    // Update stats for user
    try {
      const statsService = require('../services/statsService');
      const stats = await statsService.getStatsByUser("68b36f80cb1d579c7f9f2e5a" || userid);
      const fileTypeKey = (contentType.toLowerCase().includes('csv')) ? 'csv'
        : (contentType.toLowerCase().includes('excel') || contentType.toLowerCase().includes('xlsx')) ? 'excel'
        : (contentType.toLowerCase().includes('parquet')) ? 'parquet'
        : null;
      if (fileTypeKey) {
        const update = {
          $inc: {
            [`fileTypeStats.${fileTypeKey}`]: 1,
            [`fileSizeStats.${fileTypeKey}`]: fileSize / (1024 * 1024) // convert bytes to MB
          }
        };
        if (stats) {
          await statsService.updateStats(stats._id, update);
          console.log(`[POST /api/s3/sign-url] Stats updated for user: ${"68b36f80cb1d579c7f9f2e5a" || userid}`);
        } else {
          // Create new stats document for user
          const newStats = {
            user: "68b36f80cb1d579c7f9f2e5a" || userid,
            fileTypeStats: { [fileTypeKey]: 1 },
            fileSizeStats: { [fileTypeKey]: fileSize / (1024 * 1024) },// in MB
          };
          await statsService.createStats(newStats);
          console.log(`[POST /api/s3/sign-url] Stats created for user: ${"68b36f80cb1d579c7f9f2e5a" || userid}`);
        }
      }
    } catch (statsErr) {
      console.error('[POST /api/s3/sign-url] Stats update failed:', statsErr);
    }

    res.json({ url, key });
  } catch (err) {
    console.error('[POST /api/s3/sign-url] Error:', err);
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
    console.log('[POST /api/s3/download-to-local] Request body:', req.body);
    const { fileId } = req.body;
    if (!fileId) {
      console.warn('[POST /api/s3/download-to-local] fileId is required');
      return res.status(400).json({ error: 'fileId is required' });
    }

    const File = require('../models/File');
    const fileDoc = await File.findById(fileId);
    if (!fileDoc) {
      console.warn(`[POST /api/s3/download-to-local] File not found: ${fileId}`);
      return res.status(404).json({ error: 'File not found' });
    }

    const localDir = require('path').join(__dirname, '../local_files');
    if (!require('fs').existsSync(localDir)) require('fs').mkdirSync(localDir);
    const localPath = require('path').join(localDir, fileDoc.fileName);

    const { downloadFileFromS3 } = require('../services/s3Service');
    await downloadFileFromS3(process.env.AWS_S3_BUCKET, fileDoc.key, localPath);
    console.log(`[POST /api/s3/download-to-local] Downloaded file ${fileDoc.fileName} to ${localPath}`);

    res.json({ message: 'File downloaded to local storage', localPath });
  } catch (err) {
    console.error('[POST /api/s3/download-to-local] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/s3/download-url:
 *   get:
 *     summary: Generate a pre-signed S3 download URL for a file
 *     tags: [S3]
 *     parameters:
 *       - in: query
 *         name: fileName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the file to download
 *     responses:
 *       200:
 *         description: Pre-signed download URL generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *       400:
 *         description: fileName is required
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 */
router.get('/download-url', async (req, res) => {
  try {
    const { fileName } = req.query;
    if (!fileName) {
      return res.status(400).json({ error: 'fileName is required' });
    }
    // Find file document by fileName
    const File = require('../models/File');
    const fileDoc = await File.findOne({ fileName });
    if (!fileDoc) {
      return res.status(404).json({ error: 'File not found' });
    }
    const { getSignedDownloadUrl } = require('../services/s3Service');
    const bucket = process.env.AWS_S3_BUCKET;
    const url = await getSignedDownloadUrl(bucket, fileDoc.key);
    return res.json({ url });
  } catch (err) {
    console.error('[GET /api/s3/download-url] Error:', err);
    res.status(500).json({ error: 'Failed to generate download URL' });
  }
});

module.exports = router;
