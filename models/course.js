import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    imgUrl: String,
    roomNum: {
        type: Number,
        default: 0,
        min: 0
    },
    sellNum: {
        type: Number,
        default: 0,
        min: 0
    },
});

var Course = mongoose.model('Course', courseSchema);

export default Course;