import express from 'express';

import Room from '../models/room.js';

const router = express.Router();

export const getRooms = async (req, res) => { 
    try {
        const rooms = await Room.find();
                
        res.status(200).json(rooms);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteRoom = async (req, res) => { 
    const { id } = req.params;
    try {
        const room = await Room.findOneAndDelete({id: id});
        res.status(200).json(room);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createRoom = async (req, res) => {
    const { id, price, course, imgUrl, isFull, roomParticipants, roomCoacher, start, end} = req.body;

    const newRoom = new Room(
        { 
            id: id, 
            price: price,
            course: course,
            imgUrl: imgUrl, 
            isFull: isFull,
            roomParticipants: roomParticipants,
            roomCoacher: roomCoacher, 
            start: start, 
            end: end, 
        }
    );

    try {
        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateRoom = async (req, res) => { 
    const { id } = req.params;
    const { price, course, imgUrl, start, end } = req.body;
    try {
        const room = await Room.findOne({id: id});
        const updatedRoom = await Room.findOneAndUpdate(
            {id: room.id},
            {
                price: price,
                course: course,
                imgUrl: imgUrl, 
                start: start, 
                end: end
            },
            {new: true}
        );
        res.status(200).json(updatedRoom);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;