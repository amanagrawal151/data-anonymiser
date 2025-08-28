const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getSignedUploadUrl } = require('../services/s3Service');
const AWS = require('aws-sdk');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a file to S3
 *     consumes:
 *       - multipart/form-data
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 key:
 *                   type: string
 */
// POST /api/upload - Upload file to S3
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID ,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ,
  region: process.env.AWS_REGION ,
});
    const bucket = process.env.AWS_S3_BUCKET;
    const key = `uploads/${Date.now()}_${req.file.originalname}`;
    const params = {
      Bucket: bucket,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    await s3.upload(params).promise();
    res.json({ message: 'File uploaded successfully', key });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

module.exports = router;
