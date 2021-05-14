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
    const { id } = req.params;
    try {
        const course = await Course.findOneAndDelete({id: id});
        res.status(200).json(course);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// export const getCourse = async (req, res) => { 
//     const { id } = req.params;

//     try {
//         const course = await Course.findOne({id: id});
//         res.status(200).json(course);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }
//todo
export const createCourse = async (req, res) => {
    const { id, name, imgUrl, testList, lessonList, registerNumer } = req.body;

    const newCourse = new Course({ id: id, name: name, imgUrl:imgUrl, registerNumer: registerNumer, testList: testList, lessonList: lessonList });

    try {
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateCourse = async (req, res) => { 
    const { name, imgUrl, description, duration, testList, lessonList } = req.body;
    try {
        const course = await Course.findOne({id: req.params.id});
        const updatedCourse = await Course.findOneAndUpdate(
            {id: course.id},
            {name, imgUrl, description, duration, testList, lessonList }, 
            {new: true}
        );
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;