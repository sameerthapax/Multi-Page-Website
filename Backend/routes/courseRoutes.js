import { Router } from 'express';
import { listCourses, createCourse, getCourse, updateCourse, deleteCourse } from '../controllers/courseController.js';

const router = Router();

router.get('/', listCourses);
router.post('/', createCourse);
router.get('/:id', getCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export default router;
