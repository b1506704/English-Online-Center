import express from 'express';

import { getCategories, createCourse, deleteCourse, updateCourse } from '../controllers/courses.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', createCourse);
router.delete('/:id', deleteCourse);
router.post('/updateCourse/:id', updateCourse);
export default router;