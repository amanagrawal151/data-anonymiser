const express = require('express');
const router = express.Router();
const { getSignedUploadUrl } = require('../services/s3Service');

// POST /api/s3/sign-url
router.post('/sign-url', async (req, res) => {
  try {
    const { filename, contentType } = req.body;
    if (!filename || !contentType) {
      return res.status(400).json({ error: 'filename and contentType are required' });
    }
    const bucket = process.env.AWS_S3_BUCKET;
    const key = `uploads/${Date.now()}_${filename}`;
    const url = await getSignedUploadUrl(bucket, key, contentType);
    res.json({ url, key });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate signed URL' });
  }
});

module.exports = router;
