import express from 'express';

import { getLessons, onlineLesson, createLesson, deleteLesson, updateLesson } from '../controllers/lessons.js';

const router = express.Router();

router.get('/', getLessons);
router.post('/', createLesson);
router.post('/updateLesson/:id', updateLesson);
router.delete('/:id', deleteLesson);
router.post('/onlineLesson/:id', onlineLesson);

export default router;