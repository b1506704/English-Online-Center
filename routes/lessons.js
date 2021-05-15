import express from 'express';

import { getLessons, createLesson, deleteLesson, updateLesson } from '../controllers/lessons.js';

const router = express.Router();

router.get('/', getLessons);
router.post('/', createLesson);
router.post('/updateLesson/:id', updateLesson);
router.delete('/:id', deleteLesson);

export default router;