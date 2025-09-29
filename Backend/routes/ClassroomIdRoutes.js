const express = require('express');
const router = express.Router();
const {
  createClassroom,
  getAllClassrooms,
  getClassroomById,
  getClassroomByCode
} = require('../controllers/ClassroomIdController');

// POST /api/classrooms → Create a new classroom
router.post('/classrooms', createClassroom);

// GET /api/classrooms → Get all classrooms (ids + metadata)
router.get('/classrooms', getAllClassrooms);

// GET /api/classrooms/:id → Get a specific classroom by internal ID
router.get('/classrooms/:id', getClassroomById);

// GET /api/classrooms/code/:code → Get classroomId (and minimal metadata) by public code
router.get('/classrooms/code/:code', getClassroomByCode);

module.exports = router;

