import express from 'express';

import { getTests, createTest, deleteTest, updateTest, takeTest } from '../controllers/tests.js';

const router = express.Router();

router.get('/', getTests);
router.post('/', createTest);
router.post('/updateTest/:id', updateTest);
router.post('/takeTest/:id', takeTest);
router.delete('/:id', deleteTest);

export default router;