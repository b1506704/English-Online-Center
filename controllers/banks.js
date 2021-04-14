import express from 'express';

import Bank from '../models/bank.js';

const router = express.Router();

export const getBanks = async (req, res) => { 
    try {
        const banks = await Bank.find();
        res.status(200).json(banks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteBank = async (req, res) => { 
    const { id } = req.params;
    try {
        const bank = await Bank.findOneAndDelete({id: id});
        res.status(200).json(bank);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const createBank = async (req, res) => {
    const { id, provider, value } = req.body;
    const newBank = new Bank({ id, provider, value });

    try {
        await newBank.save();
        res.status(201).json(newBank);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
export const updateBank = async (req, res) => { 
    const { provider, value, owner } = req.body;
    try {
        const bank = await Bank.findOne({id: req.params.id});
        const updatedBank = await Bank.findOneAndUpdate(
            {id: bank.id},
            {provider: provider, value: value, owner: owner} , 
            {new: true}
        );
        res.status(200).json(updatedBank);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getBank = async (req, res) => { 
    const { id } = req.body;

    try {
        const bank = await Bank.findOne({id: id});
        res.status(200).json(bank);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export default router;