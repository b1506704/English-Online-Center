import express from 'express';

import House from '../models/house.js';

const router = express.Router();

export const getHouses = async (req, res) => { 
    try {
        const houses = await House.find();
                
        res.status(200).json(houses);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteHouse = async (req, res) => { 
    const { id } = req.params;
    try {
        const house = await House.findOneAndDelete({id: id});
        res.status(200).json(house);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createHouse = async (req, res) => {
    const { id, price, category, imgUrl, isBought, houseOwner, houseSeller, area, front , direction, address, lat, lng } = req.body;

    const newHouse = new House(
        { 
            id: id, 
            price: price,
            category: category,
            imgUrl: imgUrl, 
            isBought: isBought,
            houseOwner: houseOwner,
            houseSeller: houseSeller, 
            area: area, 
            front: front, 
            direction: direction, 
            address: address,
            lat: lat,
            lng: lng 
        }
    );

    try {
        await newHouse.save();
        res.status(201).json(newHouse);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateHouse = async (req, res) => { 
    const { id } = req.params;
    const { price, category, imgUrl, area, front, direction, address, lat, lng } = req.body;
    try {
        const house = await House.findOne({id: id});
        const updatedHouse = await House.findOneAndUpdate(
            {id: house.id},
            {
                price: price,
                category: category,
                imgUrl: imgUrl, 
                area: area, 
                front: front, 
                direction: direction, 
                address: address,
                lat: lat,
                lng: lng
            },
            {new: true}
        );
        res.status(200).json(updatedHouse);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;