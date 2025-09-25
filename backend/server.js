const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
const messageRoutes = require('./routes/roomRoutes');
app.use('/api', messageRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      message: 'Backend Example API is running!',
      endpoints: [
        'POST /api/rooms - Create a new room',
        'GET /api/rooms - Get all rooms',
        'GET /api/rooms/:id - Get a specific room by ID',
        'PUT /api/rooms/:id - Update a room by ID',
        'DELETE /api/rooms/:id - Delete a room by ID'
      ]
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see available endpoints`);
});

module.exports = app;