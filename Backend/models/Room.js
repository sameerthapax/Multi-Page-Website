import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  capacity: { type: Number, default: 100, min: 1 }
}, { timestamps: true });

export default mongoose.model('Room', roomSchema);
