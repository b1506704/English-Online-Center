import express from 'express';

import { getHouses, createHouse, deleteHouse, updateHouse } from '../controllers/houses.js';

const router = express.Router();

router.get('/', getHouses);
router.post('/', createHouse);
router.post('/updateHouse/:id', updateHouse);
router.delete('/:id', deleteHouse);

export default router;