
const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Classroom name is required'],
    trim: true,
    maxlength: [200, 'Classroom name cannot exceed 200 characters']
  },
  code: {
    type: String,
    required: [true, 'Public classroom code is required'],
    trim: true,
    uppercase: true,
    unique: true,
    maxlength: [50, 'Classroom code cannot exceed 50 characters']
  },
  teacher: {
    type: String,
    trim: true,
    maxlength: [100, 'Teacher name cannot exceed 100 characters'],
    default: 'Unknown'
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    default: ''
  },
  meta: {
    studentsCount: {
      type: Number,
      default: 0,
      min: 0
    },
    archived: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

// Indexes for common lookups
classroomSchema.index({ code: 1 }, { unique: true });
classroomSchema.index({ 'meta.archived': 1, name: 1 });

// Optional: virtual getter to expose a simple id field (string)
classroomSchema.virtual('id').get(function () {
  return this._id.toString();
});

// Ensure virtuals are included when converting to JSON
classroomSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    // remove internal fields if present
    delete ret._id;
    return ret;
  }
});

module.exports = mongoose.model('ClassroomId', classroomSchema);


