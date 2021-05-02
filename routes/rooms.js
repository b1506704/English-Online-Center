import express from 'express';

import { getRooms, createRoom, deleteRoom, updateRoom, joinRoom } from '../controllers/rooms.js';

const router = express.Router();

router.get('/', getRooms);
router.post('/', createRoom);
router.post('/updateRoom/:id', updateRoom);
router.post('/joinRoom/:id', joinRoom);
router.delete('/:id', deleteRoom);

export default router;