import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  term: { type: String, default: 'Fall 2025' },
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
