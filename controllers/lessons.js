import express from 'express';

import Lesson from '../models/lesson.js';

const router = express.Router();

export const getLessons = async (req, res) => { 
    try {
        const lessons = await Lesson.find();
                
        res.status(200).json(lessons);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteLesson = async (req, res) => { 
    const { id } = req.params;
    try {
        const lesson = await Lesson.findOneAndDelete({id: id});
        res.status(200).json(lesson);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const onlineLesson = async (req, res) => { 
    const { id } = req.params;
    try {
        const lesson = await Lesson.findOne({id: id});
        res.status(200).json(lesson);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createLesson = async (req, res) => {
    const { id, name, description, content, isGrammar, isVocabulary, isReading, isListening, duration} = req.body;

    const newLesson = new Lesson(
        { 
            id, name, description, content, isGrammar, isVocabulary, isReading, isListening, duration
        }
    );

    try {
        await newLesson.save();
        res.status(201).json(newLesson);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateLesson = async (req, res) => { 
    const { id } = req.params;
    const { name, description, content, isGrammar, isVocabulary, isReading, isListening, duration } = req.body;
    try {
        const lesson = await Lesson.findOne({id: id});
        const updatedLesson = await Lesson.findOneAndUpdate(
            {id: lesson.id},
            {
                name, description, content, isGrammar, isVocabulary, isReading, isListening, duration
            },
            {new: true}
        );
        res.status(200).json(updatedLesson);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;