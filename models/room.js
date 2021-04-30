import mongoose from 'mongoose';

const arrayLimit = (val) => val.length <=6;
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
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'            
        }],
        validate: [arrayLimit, '{PATH exceed limit range']
    },
    roomCoacher: String,
    start: String,
    end: String,
});


var Room = mongoose.model('Room', roomSchema);

export default Room;