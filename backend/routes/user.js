const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         department:
 *           type: string
 *         role:
 *           type: string
 *           enum: [admin, user]
 *       required:
 *         - name
 *         - email
 *         - department
 *         - role
 *       example:
 *         _id: 64f0c1e2a1b2c3d4e5f6a7b8
 *         name: John Doe
 *         email: john@example.com
 *         department: GSCIN-GCO-CFT-RRR PRITEC
 *         role: user
 *
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
// Create user
router.post('/', async (req, res) => {
  console.log('[POST /api/users] Body:', req.body);
  try {
    const user = await userService.createUser(req.body);
    console.log('[POST /api/users] User created:', user._id);
    res.status(201).json(user);
  } catch (err) {
    console.error('[POST /api/users] Error:', err);
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */
// Get all users
router.get('/', async (req, res) => {
  console.log('[GET /api/users]');
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error('[GET /api/users] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
// Get user by id
router.get('/:id', async (req, res) => {
  console.log('[GET /api/users/:id] Params:', req.params);
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      console.warn('[GET /api/users/:id] User not found:', req.params.id);
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('[GET /api/users/:id] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */
// Update user
router.put('/:id', async (req, res) => {
  console.log('[PUT /api/users/:id] Params:', req.params, 'Body:', req.body);
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      console.warn('[PUT /api/users/:id] User not found:', req.params.id);
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('[PUT /api/users/:id] Error:', err);
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
// Delete user
router.delete('/:id', async (req, res) => {
  console.log('[DELETE /api/users/:id] Params:', req.params);
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
      console.warn('[DELETE /api/users/:id] User not found:', req.params.id);
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('[DELETE /api/users/:id] Error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
