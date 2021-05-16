import mongoose from 'mongoose';

const testSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    name: String,
    //for learner
    result: [
        {
            userName: String,
            score: Number
        }
    ],
    //for coacher
    maxScore: Number,
    //minute
    duration: Number,
    description: String,
    questions: [{
        id: {
            type: String,
            unique: true
        },
        audioUrl: String,
        imgUrl: String,
        videoUrl: String,
        text: String,
        isAudio: Boolean,
        isVideo: Boolean,
        answerOptions: [{
            value: String,
            point: Number,
            isCorrect: Boolean,
        }]
    }],
    isPractice: {
        type: Boolean,
        default: false
    },
});

var Test = mongoose.model('Test', testSchema);

export default Test;