import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
