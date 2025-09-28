import Question from '../models/Question.js';
import { z } from 'zod';

const questionSchema = z.object({
  course: z.string().min(1),
  author: z.string().optional().nullable(),
  text: z.string().min(1),
  anonymous: z.boolean().optional(),
  status: z.enum(['open', 'addressed', 'dismissed']).optional(),
  upvotes: z.number().int().min(0).optional()
});

export const listQuestions = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.courseId) filter.course = req.query.courseId;
    const questions = await Question.find(filter)
      .populate('author', 'name role')
      .populate('course', 'code title')
      .sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) { next(err); }
};

export const createQuestion = async (req, res, next) => {
  try {
    const data = questionSchema.parse(req.body);
    const q = await Question.create(data);
    res.status(201).json(q);
  } catch (err) { next(err); }
};

export const getQuestion = async (req, res, next) => {
  try {
    const q = await Question.findById(req.params.id)
      .populate('author', 'name role')
      .populate('course', 'code title');
    if (!q) return res.status(404).json({ error: 'Not found' });
    res.json(q);
  } catch (err) { next(err); }
};

export const updateQuestion = async (req, res, next) => {
  try {
    const data = questionSchema.partial().parse(req.body);
    const q = await Question.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!q) return res.status(404).json({ error: 'Not found' });
    res.json(q);
  } catch (err) { next(err); }
};

export const deleteQuestion = async (req, res, next) => {
  try {
    const q = await Question.findByIdAndDelete(req.params.id);
    if (!q) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) { next(err); }
};
