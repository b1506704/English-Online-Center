import express from 'express';

import isValidPurchase from '../middleware/transaction_auth.js';
import User from '../models/user.js';
import Bank from '../models/bank.js';
import House from '../models/house.js';


const router = express.Router();

export const getUsers = async (req, res) => { 
    try {
        const users = await User.find();
                
        res.status(200).json(users);
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
    const { userName, passWord, email } = req.body;
    const newUser = new User({ userName, passWord, email });

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
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

export const buyHouse = async (req, res) => { 
    const { userName } = req.params;
    const { id } = req.body;
    //todo: reduce bank value
    try {
        const user = await User.findOne({userName: userName});
        const house = await House.findOne({id});
        const seller = await User.findOne({userName: house.houseSeller});
        const bank = await Bank.findOne({owner: user.userName});
        if (house.isBought === false 
            && isValidPurchase(user.balance,house.price)  
            && user.userName != seller.userName
            ) {
            const updatedHouse = await House.findOneAndUpdate({id: id},{isBought: true, houseOwner: userName}, {new: true});
            const updatedSeller = await User.findOneAndUpdate(
                {userName: seller.userName},
                {
                    balance: seller.balance + updatedHouse.price,
                    $push: {houseSellList: updatedHouse.id},
                },
                {new: true}
            );
            const updatedUser = await User.findOneAndUpdate(
                {userName: userName},
                {
                    balance: user.balance - updatedHouse.price,
                    $push: {houseOwnList: updatedHouse.id},
                },
                {new: true}
            );
            const updatedBank = await Bank.findOneAndUpdate(
                {owner: bank.owner},
                {value: bank.value - updatedHouse.price},
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

export default router;