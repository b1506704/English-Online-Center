import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    imgUrl: String,
    description: String,
    lessonCollection: Array,
    // include tests' id
    testCollection: Array,
    registerNumer: {
        type: Number,
        default: 0,
        min: 0
    },
});

var Course = mongoose.model('Course', courseSchema);

export default Course;