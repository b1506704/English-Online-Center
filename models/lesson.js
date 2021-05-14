import mongoose from 'mongoose';

// flashcard lesson
const lessonSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    name: String,
    author: String,
    imgUrl: String,
    // front text
    front: {
        text: String,
        image: String
    },
    // back text
    back: {
        text: String
    },
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