import express from 'express';

import Course from '../models/course.js';

const router = express.Router();

export const getCategories = async (req, res) => { 
    try {
        const courses = await Course.find();
       
        res.status(200).json(courses);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteCourse = async (req, res) => { 
    const { name } = req.params;
    try {
        const course = await Course.findOneAndDelete({name: name});
        res.status(200).json(course);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCourse = async (req, res) => { 
    const { name } = req.params;

    try {
        const course = await Course.findOne({name: name});
        res.status(200).json(course);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
//todo
export const createCourse = async (req, res) => {
    const { name, imgUrl, registerNumer } = req.body;

    const newCourse = new Course({ name: name, imgUrl:imgUrl, registerNumer: registerNumer });

    try {
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateCourse = async (req, res) => { 
    const { name, imgUrl } = req.body;
    try {
        const course = await Course.findOne({name: req.params.name});
        const updatedCourse = await Course.findOneAndUpdate(
            {name: course.name},
            {name: name, imgUrl: imgUrl} , 
            {new: true}
        );
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;