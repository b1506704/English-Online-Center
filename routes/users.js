import express from 'express';

import { login, register, getUser, logout, addBank, buyHouse } from '../controllers/users.js';

const router = express.Router();

router.post('/', register);
router.get('/:userName', getUser);
router.post('/:userInfo', login);
router.post('/logout/:userInfo', logout);
router.post('/addBank/:userName', addBank);
router.post('/buyHouse/:userName', buyHouse);

export default router;