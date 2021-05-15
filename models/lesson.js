import mongoose from 'mongoose';

// flashcard lesson
const lessonSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    name: String,
    description: String,
    author: String,
    // array of obj with front and back
    // may vary according to type
    content: [{
        id: {
            type: String,
            unique: true
        },
        front: {
            text: String,
            image: String
        },
        back: {
            text: String
        }
    }],
    isGrammar: Boolean,
    isVocabulary: Boolean,
    isReading: Boolean,
    isListening: Boolean,
    // audio for listening dialogue
    audioUrl: String,
    // if has video
    videoUrl: String,
    // min to read
    duration: Number,
});

var Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;