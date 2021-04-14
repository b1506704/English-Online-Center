import express from 'express';

import { getRooms, createRoom, deleteRoom, updateRoom } from '../controllers/rooms.js';

const router = express.Router();

router.get('/', getRooms);
router.post('/', createRoom);
router.post('/updateRoom/:id', updateRoom);
router.delete('/:id', deleteRoom);

export default router;