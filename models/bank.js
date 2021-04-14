import mongoose from 'mongoose';
const bankSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    provider: {
        type: String,
        default: ""
    },
    value: {
        type: Number,
        min: 0,
        default: 0
    },
    owner: {
        type: String,
        default: ''
    },
    isOwned: {
        type: Boolean,
        default: false,
    },
});

var Bank = mongoose.model('Bank', bankSchema);

export default Bank;