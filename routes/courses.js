import express from 'express';

import { getCategories, createCourse, deleteCourse, updateCourse } from '../controllers/courses.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', createCourse);
router.delete('/:name', deleteCourse);
router.post('/updateCourse/:name', updateCourse);
export default router;