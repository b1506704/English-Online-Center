import mongoose from 'mongoose';

const testSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    name: String,
    //for learner
    record: [
        {
            userName: String,
            duration: Number,
            score: Number,
            answerSheet: [{
                id: {
                    type: String,
                },
                audioUrl: String,
                imgUrl: String,
                videoUrl: String,
                text: String,
                point: Number,
                isAudio: Boolean,
                isVideo: Boolean,
                answerOptions: [{
                    value: String,
                    isCorrect: Boolean,
                    isSelected: Boolean
                }]
            }],
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
        },
        audioUrl: String,
        imgUrl: String,
        videoUrl: String,
        text: String,
        isAudio: Boolean,
        isVideo: Boolean,
        point: Number,
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