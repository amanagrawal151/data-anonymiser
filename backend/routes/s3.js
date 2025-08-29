const express = require('express');
const router = express.Router();
const { getSignedUploadUrl } = require('../services/s3Service');


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
    const { filename, contentType } = req.body;
    if (!filename || !contentType) {
      return res.status(400).json({ error: 'filename and contentType are required' });
    }
    const bucket = process.env.AWS_S3_BUCKET;
    const { url, key } = await getSignedUploadUrl(bucket, filename, contentType);
    res.json({ url, key });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate signed URL' });
  }
});

module.exports = router;
