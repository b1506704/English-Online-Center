import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    title: String,
    course: String,
    imgUrl: String,
    price: {
        type: Number,
        min: 0
    },
    isFull: {
        type:Boolean,
        default: false,
    },
    roomParticipants: {
        type: Array,
        length: 6
    },
    roomCoacher: String,
    start: String,
    end: String,
});


var Room = mongoose.model('Room', roomSchema);

export default Room;