import mongoose from 'mongoose';

const curriculumSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    course: String,
    //weeks
    duration: Number,
    // object of tests
    // test: { id, question, answer}
    testList: Array
});

var Curriculum = mongoose.model('Curriculum', curriculumSchema);

export default Curriculum;