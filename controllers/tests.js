import express from 'express';

import Test from '../models/test.js';
import evaluate from '../middleware/markScore.js';

const router = express.Router();

export const getTests = async (req, res) => { 
    try {
        const tests = await Test.find();
                
        res.status(200).json(tests);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteTest = async (req, res) => { 
    const { id } = req.params;
    try {
        const test = await Test.findOneAndDelete({id: id});
        res.status(200).json(test);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createTest = async (req, res) => {
    const { id, name, description, questions, isPractice} = req.body;

    const newTest = new Test(
        { 
            id: id, 
            name: name,
            description: description,
            questions: questions,
            isPractice: isPractice, 
        }
    );

    try {
        await newTest.save();
        res.status(201).json(newTest);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateTest = async (req, res) => { 
    const { id } = req.params;
    const { name, questions, description, maxScore, duration, isPractice } = req.body;
    try {
        const test = await Test.findOne({id: id});
        const updatedTest = await Test.findOneAndUpdate(
            {id: test.id},
            {
                name: name,
                description: description,
                maxScore: maxScore,
                duration: duration,
                questions: questions,
                isPractice: isPractice, 
            },
            {new: true}
        );
        res.status(200).json(updatedTest);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const takeTest = async (req, res) => { 
    const { id } = req.params;
    const  record  = req.body;
    try {
        const test = await Test.findOne({id: id});
        const markedRecord = evaluate(record);
        const updatedTest = await Test.findOneAndUpdate(
            {id: test.id},
            {
                $push: {record: markedRecord },
            },
            {new: true}
        );
        res.status(200).json(updatedTest);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;