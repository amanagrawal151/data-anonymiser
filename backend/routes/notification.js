/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the notification
 *         user:
 *           type: string
 *           description: The user id
 *         unread:
 *           type: boolean
 *         priority:
 *           type: boolean
 *         title:
 *           type: string
 *         details:
 *           type: string
 *         fileType:
 *           type: string
 *         cryptForm:
 *           type: string
 *         time:
 *           type: string
 *         bg:
 *           type: string
 *       example:
 *         _id: 64f0c1e2a1b2c3d4e5f6a7b8
 *         user: 64f0c1e2a1b2c3d4e5f6a7b7
 *         unread: true
 *         priority: false
 *         title: Sample Notification
 *         details: This is a sample notification. Your API is not responding.
 *         fileType: csv
 *         cryptForm: encryption
 *         time: just now
 *         bg: bg-lvl1
 */

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: Notification created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Bad request
 */
const express = require('express');
const router = express.Router();
const notificationService = require('../services/notificationService');
const { body, validationResult } = require('express-validator');

// Create notification
router.post('/',
  body('user').notEmpty(),
  body('title').notEmpty(),
  body('details').notEmpty(),
  body('fileType').optional(),
  body('cryptForm').optional(),
  async (req, res) => {
    console.log('[POST /api/notifications] Body:', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.warn('[POST /api/notifications] Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const notification = await notificationService.createNotification(req.body);
      console.log('[POST /api/notifications] Notification created:', notification._id);
      res.status(201).json(notification);
    } catch (err) {
      console.error('[POST /api/notifications] Error:', err);
      res.status(500).json({ error: err.message });
    }
  }
);

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get all notifications (optionally filter by user)
 *     tags: [Notifications]
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: User ID to filter notifications
 *     responses:
 *       200:
 *         description: List of notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  console.log('[GET /api/notifications] Query:', req.query);
  try {
    const filter = req.query.user ? { user: req.query.user } : {};
    const notifications = await notificationService.getNotifications(filter);
    res.json(notifications.reverse()); // Return in reverse chronological order
  } catch (err) {
    console.error('[GET /api/notifications] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     summary: Get a notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
  console.log('[GET /api/notifications/:id] Params:', req.params);
  try {
    const notification = await notificationService.getNotificationById(req.params.id);
    if (!notification) {
      console.warn('[GET /api/notifications/:id] Notification not found:', req.params.id);
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(notification);
  } catch (err) {
    console.error('[GET /api/notifications/:id] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/notifications/{id}:
 *   put:
 *     summary: Update a notification
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       200:
 *         description: Notification updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.put('/:id', async (req, res) => {
  console.log('[PUT /api/notifications/:id] Params:', req.params, 'Body:', req.body);
  try {
    const notification = await notificationService.updateNotification(req.params.id, req.body);
    if (!notification) {
      console.warn('[PUT /api/notifications/:id] Notification not found:', req.params.id);
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(notification);
  } catch (err) {
    console.error('[PUT /api/notifications/:id] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification deleted
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
  console.log('[DELETE /api/notifications/:id] Params:', req.params);
  try {
    const notification = await notificationService.deleteNotification(req.params.id);
    if (!notification) {
      console.warn('[DELETE /api/notifications/:id] Notification not found:', req.params.id);
      return res.status(404).json({ error: 'Not found' });
    }
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('[DELETE /api/notifications/:id] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
