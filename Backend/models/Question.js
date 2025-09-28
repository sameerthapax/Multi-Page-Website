import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  text: { type: String, required: true, trim: true },
  anonymous: { type: Boolean, default: true },
  status: { type: String, enum: ['open', 'addressed', 'dismissed'], default: 'open' },
  upvotes: { type: Number, default: 0, min: 0 }
}, { timestamps: true });

export default mongoose.model('Question', questionSchema);
