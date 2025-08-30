const express = require('express');
const cryptService = require('../services/cryptService');
const router = express.Router();



/**
 * @swagger
 * /api/crypt/encrypt:
 *   post:
 *     summary: Encrypt a string
 *     tags: [Crypt]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Encrypted string
 *       400:
 *         description: Bad request
 */
router.post('/encrypt', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });
  try {
    const encrypted = cryptService.encrypt(text);
    res.json({ encrypted });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/crypt/decrypt:
 *   post:
 *     summary: Decrypt a string
 *     tags: [Crypt]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               encrypted:
 *                 type: string
 *     responses:
 *       200:
 *         description: Decrypted string
 *       400:
 *         description: Bad request
 */
router.post('/decrypt', (req, res) => {
  const { encrypted } = req.body;
  if (!encrypted) return res.status(400).json({ error: 'Encrypted string is required' });
  try {
    const decrypted = cryptService.decrypt(encrypted);
    res.json({ decrypted });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
