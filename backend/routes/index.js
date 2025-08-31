var express = require('express');
var router = express.Router();

/* GET home page. */

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Hello route for health check
 *     tags: [Hello]
 *     responses:
 *       200:
 *         description: Returns a hello message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello from Data Anonymizer API!
 */
router.get('/api/hello', function(req, res) {
  res.json({ message: 'Hello from Data Anonymizer API!' });
});

module.exports = router;
