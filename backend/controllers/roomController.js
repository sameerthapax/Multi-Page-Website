const Room = require('../models/Room');

// Helper function to send standardized responses
const sendResponse = (res, statusCode, success, data = null, error = null) => {
  const response = { success };
  
  if (success && data !== null) {
    response.data = data;
  }
  
  if (!success && error) {
    response.error = error;
  }
  
  return res.status(statusCode).json(response);
};

// POST /api/rooms → Create a new room
const createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    const savedRoom = await room.save();

    sendResponse(res, 201, true, {
      rooms: "Room created successfully",
      roomData: savedRoom
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to create room");
  }
};

// GET /api/rooms → Get all rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    sendResponse(res, 200, true, {
      rooms: rooms,
      count: rooms.length
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to retrieve room");
  }
};

// GET /api/rooms/:id → Get a specific room by ID
const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return sendResponse(res, 400, false, null, "Room ID is required");
    }

    const room = await Room.findById(id)

    sendResponse(res, 200, true, {
      room: room
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to retrieve room");
  }
};

// PUT /api/rooms/:id → Update a room by ID
const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (!id) {
      return sendResponse(res, 400, false, null, "Room ID is required");
    }

    const updatedRoom = await Room.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
      timestamps: true
    })

    sendResponse(res, 200, true, {
      room: "Room updated successfully",
      roomData: updatedRoom
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to update room");
  }
};

// DELETE /api/rooms/:id → Delete a room by ID
const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return sendResponse(res, 400, false, null, "Room ID is required");
    }

    const room = await Room.findByIdAndDelete(req.params.id);

    sendResponse(res, 200, true, {
      room: `Room with ID ${id} deleted successfully`,
      deletedId: id
    });
  } catch (error) {
    sendResponse(res, 500, false, null, "Failed to delete room");
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom
};