import express from 'express';

import { login, register, getUser, logout, addBank, registerRoom, getUsers } from '../controllers/users.js';

const router = express.Router();

router.post('/', register);
router.get('/:userName', getUser);
router.get('/', getUsers);
router.post('/:userInfo', login);
router.post('/logout/:userInfo', logout);
router.post('/addBank/:userName', addBank);
router.post('/registerRoom/:userName', registerRoom);

export default router;