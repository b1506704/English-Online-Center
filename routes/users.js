import express from 'express';

import { login, register, getUser, logout, getUsers, updateUser, deleteUser, setNewPassword } from '../controllers/users.js';

const router = express.Router();

router.post('/', register);
router.get('/:userName', getUser);
router.get('/', getUsers);
router.post('/:userInfo', login);
router.post('/logout/:userInfo', logout);
router.delete('/:userName', deleteUser);
router.post('/updateUser/:userName', updateUser);
router.post('/setNewPassword/:userName', setNewPassword);

export default router;