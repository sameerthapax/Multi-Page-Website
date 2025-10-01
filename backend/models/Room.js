const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: [true, 'Creator name is required'],
    trim: true,
    maxlength: [100, 'Creator name cannot exceed 100 characters']
  },
  name: {
    type: String,
    required: [true, 'Room name is required'],
    trim: true,
    maxlength: [100, 'Room name cannot exceed 1000 characters']
  },
}, {
  timestamps: true
});

roomSchema.index({ timestamp: -1 });
roomSchema.index({ author: 1 });

module.exports = mongoose.model('Room', roomSchema);