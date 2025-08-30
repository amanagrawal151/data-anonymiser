const express = require('express');
const router = express.Router();
const statsService = require('../services/statsService');

/**
 * @swagger
 * /api/stats:
 *   post:
 *     summary: Create new stats
 *     tags: [Stats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Stats created
 *       400:
 *         description: Bad request
 */
router.post('/', async (req, res) => {
  try {
    const stats = await statsService.createStats(req.body);
    res.status(201).json(stats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get all stats
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: List of stats
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const stats = await statsService.getAllStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/stats/{id}:
 *   get:
 *     summary: Get stats by ID
 *     tags: [Stats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stats found
 *       404:
 *         description: Stats not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
  try {
    const stats = await statsService.getStatsById(req.params.id);
    if (!stats) return res.status(404).json({ error: 'Stats not found' });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/stats/{id}:
 *   put:
 *     summary: Update stats by ID
 *     tags: [Stats]
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
 *     responses:
 *       200:
 *         description: Stats updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Stats not found
 */
router.put('/:id', async (req, res) => {
  try {
    const stats = await statsService.updateStats(req.params.id, req.body);
    if (!stats) return res.status(404).json({ error: 'Stats not found' });
    res.json(stats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/stats/{id}:
 *   delete:
 *     summary: Delete stats by ID
 *     tags: [Stats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stats deleted
 *       404:
 *         description: Stats not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
  try {
    const stats = await statsService.deleteStats(req.params.id);
    if (!stats) return res.status(404).json({ error: 'Stats not found' });
    res.json({ message: 'Stats deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/**
 * @swagger
 * /api/stats/user/{userId}:
 *   get:
 *     summary: Get stats by user ID
 *     tags: [Stats]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stats for the user
 *       404:
 *         description: Stats not found
 *       500:
 *         description: Server error
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const stats = await statsService.getStatsByUser(req.params.userId);
    if (!stats) return res.status(404).json({ error: 'Stats not found' });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
