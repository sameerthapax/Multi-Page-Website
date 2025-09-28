import Course from '../models/Course.js';
import { z } from 'zod';

const courseSchema = z.object({
  code: z.string().min(2),
  title: z.string().min(2),
  instructor: z.string().min(1),
  term: z.string().optional()
});

export const listCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('instructor', 'name email role').sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) { next(err); }
};

export const createCourse = async (req, res, next) => {
  try {
    const data = courseSchema.parse(req.body);
    const course = await Course.create(data);
    res.status(201).json(course);
  } catch (err) { next(err); }
};

export const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email role');
    if (!course) return res.status(404).json({ error: 'Not found' });
    res.json(course);
  } catch (err) { next(err); }
};

export const updateCourse = async (req, res, next) => {
  try {
    const data = courseSchema.partial().parse(req.body);
    const course = await Course.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!course) return res.status(404).json({ error: 'Not found' });
    res.json(course);
  } catch (err) { next(err); }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) { next(err); }
};
