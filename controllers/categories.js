import express from 'express';

import Category from '../models/category.js';

const router = express.Router();

export const getCategories = async (req, res) => { 
    try {
        const categories = await Category.find();
       
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteCategory = async (req, res) => { 
    const { name } = req.params;
    try {
        const category = await Category.findOneAndDelete({name: name});
        res.status(200).json(category);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getCategory = async (req, res) => { 
    const { name } = req.params;

    try {
        const category = await Category.findOne({name: name});
        res.status(200).json(category);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
//todo
export const createCategory = async (req, res) => {
    const { name, imgUrl, houseNum, sellNum } = req.body;

    const newCategory = new Category({ name: name, imgUrl:imgUrl, houseNum: houseNum, sellNum: sellNum });

    try {
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateCategory = async (req, res) => { 
    const { name, imgUrl } = req.body;
    try {
        const category = await Category.findOne({name: req.params.name});
        const updatedCategory = await Category.findOneAndUpdate(
            {name: category.name},
            {name: name, imgUrl: imgUrl} , 
            {new: true}
        );
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;