import mongoose from 'mongoose';

const testSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    name: String,
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