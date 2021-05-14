import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    imgUrl: String,
    author: String,
    description: String,
    // weeks
    duration: String,
    // include lesson id
    lessonList: Array,
    // include tests' id
    testList: Array,
    registerNumer: {
        type: Number,
        default: 0,
        min: 0
    },
});

var Course = mongoose.model('Course', courseSchema);

export default Course;