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
  try {
    const file = await fileService.createFile(req.body);
    res.status(201).json(file);
  } catch (err) {
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
  try {
    const files = await fileService.getAllFiles();
    res.json(files);
  } catch (err) {
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
  try {
    const file = await fileService.getFileById(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });
    res.json(file);
  } catch (err) {
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
  try {
    const file = await fileService.updateFile(req.params.id, req.body);
    if (!file) return res.status(404).json({ error: 'File not found' });
    res.json(file);
  } catch (err) {
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
  try {
    const file = await fileService.deleteFile(req.params.id);
    if (!file) return res.status(404).json({ error: 'File not found' });
    res.json({ message: 'File deleted' });
  } catch (err) {
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
  try {
    const files = await fileService.getFilesByUser(req.params.userId);
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
