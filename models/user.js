import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
        unique: true,
        maxlength: 8
    },
    passWord: {
        type: String,
        require: true,
        maxlength: 12
    },
    imgUrl: String,
    gender: String,
    fullName: String,
    balance: {
        type: Number,
        min: 0,
        default: 0
    },
    email: {
        type: String,
        default: '',
        unique: true
    },
    bankID: {
        type: String,
        default: ''
    },
    bankProvider: {
        type: String,
        default: ''
    },
    address: String,
    phoneNumber: String,
    birthDate: String,
    //student
    roomRegisterList: Array,
    testList: Array,
    //coacher
    roomCoachingList: Array,
    //academic manager
    isLogin: {
        type: Boolean,
        default: false
    },
    isUser: {
        type: Boolean,
        default: true
    },
    isCoacher: {
        type: Boolean,
        default: false
    },
    isCenterManager: {
        type: Boolean,
        default: false
    },
    isMarketingManager: {
        type: Boolean,
        default: false
    },
    isSalesManager: {
        type: Boolean,
        default: false
    },
    isAcademicManager: {
        type: Boolean,
        default: false
    },
    isHRManager: {
        type: Boolean,
        default: false
    },
    question_1: String
});

var User = mongoose.model('User', userSchema);

export default User;