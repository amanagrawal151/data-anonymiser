const express = require('express');
const router = express.Router();
const fileService = require('../services/fileService');

/**
 * @swagger
 * /api/files:
 *   post:
 *     summary: Create a new file
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *               fileType:
 *                 type: string
 *               uploadTimestamp:
 *                 type: string
 *                 format: date-time
 *               processingTimestamp:
 *                 type: string
 *                 format: date-time
 *               stage:
 *                 type: string
 *                 enum: [uploaded, processed, failed, success]
 *               user:
 *                 type: string
 *                 description: User ID
 *     responses:
 *       201:
 *         description: File created
 *       400:
 *         description: Bad request
 */
// Create file
// Get all files
router.post('/', async (req, res) => {
  console.log('[POST /api/files] Body:', req.body);
  try {
    const file = await fileService.createFile(req.body);
    console.log('[POST /api/files] File created:', file._id);
    res.status(201).json(file);
  } catch (err) {
    console.error('[POST /api/files] Error:', err);
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/files:
 *   get:
 *     summary: Get all files
 *     tags: [Files]
 *     responses:
 *       200:
 *         description: List of files
 *       500:
 *         description: Server error
 * */
// Get all files
// Get file by id
router.get('/', async (req, res) => {
  console.log('[GET /api/files]');
  try {
    const files = await fileService.getAllFiles();
    res.json(files);
  } catch (err) {
    console.error('[GET /api/files] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/files/{id}:
 *   get:
 *     summary: Get file by ID
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File found
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 * */
// Get file by id
// Update file
router.get('/:id', async (req, res) => {
  console.log('[GET /api/files/:id] Params:', req.params);
  try {
    const file = await fileService.getFileById(req.params.id);
    if (!file) {
      console.warn('[GET /api/files/:id] File not found:', req.params.id);
      return res.status(404).json({ error: 'File not found' });
    }
    res.json(file);
  } catch (err) {
    console.error('[GET /api/files/:id] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/files/{id}:
 *   put:
 *     summary: Update file by ID
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *               fileType:
 *                 type: string
 *               uploadTimestamp:
 *                 type: string
 *                 format: date-time
 *               processingTimestamp:
 *                 type: string
 *                 format: date-time
 *               stage:
 *                 type: string
 *                 enum: [uploaded, processed, failed, success]
 *               user:
 *                 type: string
 *                 description: User ID
 *     responses:
 *       200:
 *         description: File updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: File not found
 * */
// Update file
// Delete file
router.put('/:id', async (req, res) => {
  console.log('[PUT /api/files/:id] Params:', req.params, 'Body:', req.body);
  try {
    const file = await fileService.updateFile(req.params.id, req.body);
    if (!file) {
      console.warn('[PUT /api/files/:id] File not found:', req.params.id);
      return res.status(404).json({ error: 'File not found' });
    }
    res.json(file);
  } catch (err) {
    console.error('[PUT /api/files/:id] Error:', err);
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/files/{id}:
 *   delete:
 *     summary: Delete file by ID
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File deleted
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 * */
// Delete file
// Get files by user
router.delete('/:id', async (req, res) => {
  console.log('[DELETE /api/files/:id] Params:', req.params);
  try {
    const file = await fileService.deleteFile(req.params.id);
    if (!file) {
      console.warn('[DELETE /api/files/:id] File not found:', req.params.id);
      return res.status(404).json({ error: 'File not found' });
    }
    res.json({ message: 'File deleted' });
  } catch (err) {
    console.error('[DELETE /api/files/:id] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/files/user/{userId}:
 *   get:
 *     summary: Get files by user ID
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of files for the user
 *       500:
 *         description: Server error
 * */
// Get files by user
router.get('/user/:userId', async (req, res) => {
  console.log('[GET /api/files/user/:userId] Params:', req.params);
  try {
    const files = await fileService.getFilesByUser(req.params.userId);
    res.json(files);
  } catch (err) {
    console.error('[GET /api/files/user/:userId] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
