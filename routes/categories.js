import express from 'express';

import { getCategories, createCategory, deleteCategory, updateCategory } from '../controllers/categories.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', createCategory);
router.delete('/:name', deleteCategory);
router.post('/updateCategory/:name', updateCategory);
export default router;