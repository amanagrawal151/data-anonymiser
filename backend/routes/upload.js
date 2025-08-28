const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getSignedUploadUrl, uploadFileToS3 } = require('../services/s3Service');
const AWS = require('aws-sdk');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a file to S3
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
 *     responses:
 *       200:
 *         description: File uploaded successfully
 */
// POST /api/upload - Upload file to S3

router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const key = `uploads/${Date.now()}_${req.file.originalname}`;
    await uploadFileToS3(req.file.buffer, key, req.file.mimetype);
    res.json({ message: 'File uploaded successfully', key });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

module.exports = router;
