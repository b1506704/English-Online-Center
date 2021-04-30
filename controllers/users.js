import express from 'express';

import isValidPurchase from '../middleware/transaction_auth.js';
import User from '../models/user.js';
import Bank from '../models/bank.js';
import Room from '../models/room.js';


const router = express.Router();

export const getUsers = async (req, res) => { 
    try {
        const users = await User.find();
                
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => { 
    const { userName } = req.params;
    try {
        const user = await User.findOneAndDelete({userName: userName});
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUser = async (req, res) => {
    const { userName } = req.params;
    try {
        const user = await User.findOne({userName: userName});
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

export const login = async (req, res) => { 
    const { userName, passWord } = req.body;

    try {
        const user = await User.findOneAndUpdate({userName: userName, passWord: passWord},{isLogin: true},{new:true});
        if (user === null) {
            res.status(404).json("Đăng nhập thất bại");
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const logout = async (req, res) => { 
    const { userName } = req.body;
    try {
        const user = await User.findOneAndUpdate({userName: userName},{isLogin: false}, {new: true});
        res.status(200).json(null);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const register = async (req, res) => {
    const { userName, passWord, gender, fullName, email, question_1 } = req.body;
    const newUser = new User({ userName, passWord, gender, fullName, email, question_1 });

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const updateUser = async (req, res) => { 
    const { userName, passWord, gender, fullName, email } = req.body;
    try {
        const user = await User.findOne({userName: req.params.userName});
        const updatedUser = await User.findOneAndUpdate(
            {userName: user.userName},
            {userName, passWord, gender, fullName, email} , 
            {new: true}
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const addBank = async (req, res) => { 
    const { userName } = req.params;
    const { id, provider } = req.body;
    try {
        const user = await User.findOne({userName: userName});
        const bank = await Bank.findOne({id, provider});
        if (bank.isOwned === false && bank.owner != user.userName) {
            const updatedBank = await Bank.findOneAndUpdate({id: id, provider: provider},{isOwned: true, owner: user.userName}, {new: true});
            const updatedUser = await User.findOneAndUpdate({userName: userName},{balance: updatedBank.value, bankID: bank.id, bankProvider: bank.provider}, {new: true});
            res.status(200).json(updatedUser.balance);
        } else {
            res.status(404).json("Xảy ra lỗi!");
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const registerRoom = async (req, res) => { 
    const { userName } = req.params;
    const { id } = req.body;
    //todo: push user to room participants
    try {
        const user = await User.findOne({userName: userName});
        const room = await Room.findOne({id});
        const coacher = await User.findOne({userName: room.roomCoacher});
        const bank = await Bank.findOne({owner: user.userName});
        if (room.isFull === false 
            && isValidPurchase(user.balance,room.price)  
            && user.userName != coacher.userName
            ) {
            const updatedRoom = await Room.findOneAndUpdate({id: id},{isFull: true, roomParticipants: userName}, {new: true});
            const updatedCoacher = await User.findOneAndUpdate(
                {userName: coacher.userName},
                {
                    balance: coacher.balance + updatedRoom.price,
                    $push: {roomCoachingList: updatedRoom.id},
                },
                {new: true}
            );
            const updatedUser = await User.findOneAndUpdate(
                {userName: userName},
                {
                    balance: user.balance - updatedRoom.price,
                    $push: {roomRegisterList: updatedRoom.id},
                },
                {new: true}
            );
            const updatedBank = await Bank.findOneAndUpdate(
                {owner: bank.owner},
                {value: bank.value - updatedRoom.price},
                {new: true}
            );

            res.status(200).json(updatedUser.balance);
        } else {
            res.status(404).json("Xảy ra lỗi!");
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const setNewPassword = async (req, res) => { 
    const { userName, passWord, question_1 } = req.body;
    try {
        const user = await User.findOne({userName: req.params.userName});
        if (question_1 === user.question_1) {
            const updatedUser = await User.findOneAndUpdate(
                {userName: user.userName},
                {userName, passWord} , 
                {new: true}
            );
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json("Incorrect Answer!");    
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;