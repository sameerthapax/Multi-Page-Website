 
const ClassroomModel = require('../models/ClassroomId');

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

// GET /api/classrooms → Get all classrooms (IDs + metadata)
const getAllClassrooms = async (req, res) => {
  try {
    // TODO: replace with real DB call
    const classrooms = await ClassroomModel.findAll();

    sendResponse(res, 200, true, {
      classrooms,
      count: classrooms.length
    });
  } catch (err) {
    sendResponse(res, 500, false, null, "Failed to retrieve classrooms");
  }
};

// GET /api/classrooms/:id → Get a specific classroom by internal ID
const getClassroomById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 400, false, null, "Classroom ID is required");
    }

    // TODO: replace with real DB lookup
    const classroom = await ClassroomModel.findById(id);

    if (!classroom) {
      return sendResponse(res, 404, false, null, `Classroom with ID ${id} not found`);
    }

    sendResponse(res, 200, true, { classroom });
  } catch (err) {
    sendResponse(res, 500, false, null, "Failed to retrieve classroom");
  }
};

// GET /api/classrooms/code/:code → Obtain a classroomId by public code (e.g. invite/code)
const getClassroomByCode = async (req, res) => {
  try {
    const { code } = req.params;

    if (!code) {
      return sendResponse(res, 400, false, null, "Classroom code is required");
    }

    // TODO: replace with real DB lookup
    const classroom = await ClassroomModel.findByCode(code);

    if (!classroom) {
      return sendResponse(res, 404, false, null, `Classroom with code ${code} not found`);
    }

    // Return only the classroomId (and optionally minimal metadata)
    sendResponse(res, 200, true, {
      classroomId: classroom.id,
      classroom: {
        name: classroom.name,
        code: classroom.code,
        teacher: classroom.teacher
      }
    });
  } catch (err) {
    sendResponse(res, 500, false, null, "Failed to retrieve classroom by code");
  }
};

// POST /api/classrooms → Create a classroom (placeholder)
const createClassroom = async (req, res) => {
  try {
    const payload = req.body || {};
    // TODO: validate payload and persist to DB
    const newClassroom = await ClassroomModel.create(payload);

    sendResponse(res, 201, true, {
      message: "Classroom created successfully",
      classroom: newClassroom
    });
  } catch (err) {
    sendResponse(res, 500, false, null, "Failed to create classroom");
  }
};

module.exports = {
  getAllClassrooms,
  getClassroomById,
  getClassroomByCode,
  createClassroom
};


