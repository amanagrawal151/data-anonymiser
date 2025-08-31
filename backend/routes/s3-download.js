const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const File = require('../models/File');

// POST /api/s3/download-to-local
router.post('/download-to-local', async (req, res) => {
  try {
    const { fileId } = req.body;
    if (!fileId) return res.status(400).json({ error: 'fileId is required' });

    const fileDoc = await File.findById(fileId);
    if (!fileDoc) return res.status(404).json({ error: 'File not found' });

    const s3 = new AWS.S3();
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileDoc.key,
    };

    const localDir = path.join(__dirname, '../local_files');
    if (!fs.existsSync(localDir)) fs.mkdirSync(localDir);
    const localPath = path.join(localDir, fileDoc.fileName);

    const fileStream = fs.createWriteStream(localPath);
    s3.getObject(params).createReadStream().pipe(fileStream);

    fileStream.on('close', () => {
      res.json({ message: 'File downloaded to local storage', localPath });
    });
    fileStream.on('error', err => {
      res.status(500).json({ error: 'Failed to save file locally', details: err.message });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
