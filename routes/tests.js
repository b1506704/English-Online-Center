import express from 'express';

import { getTests, createTest, deleteTest, updateTest } from '../controllers/tests.js';

const router = express.Router();

router.get('/', getTests);
router.post('/', createTest);
router.post('/updateTest/:id', updateTest);
router.delete('/:id', deleteTest);

export default router;