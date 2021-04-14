import express from 'express';
import { getBanks, createBank, deleteBank, updateBank } from '../controllers/banks.js';

const router = express.Router();

router.get('/', getBanks);
router.post('/', createBank);
router.delete('/:id', deleteBank);
router.post('/updateBank/:id', updateBank);

export default router;