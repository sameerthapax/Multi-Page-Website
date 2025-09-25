const express = require('express');
const router = express.Router();
const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom
} = require('../controllers/roomController');

// POST /api/rooms → Create a new room
router.post('/rooms', createRoom);

// GET /api/rooms → Get all rooms
router.get('/rooms', getAllRooms);

// GET /api/rooms/:id → Get a specific room by ID
router.get('/rooms/:id', getRoomById);

// PUT /api/rooms/:id → Update a room by ID
router.put('/rooms/:id', updateRoom);

// DELETE /api/rooms/:id → Delete a room by ID
router.delete('/rooms/:id', deleteRoom);

module.exports = router;