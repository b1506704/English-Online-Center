import {
    SEND_MESSAGE,
    ANSWER_QUESTION,
    GET_ROOM_USER,
    SHOW_QUESTION,
    GET_QUESTION,
    ACTIVATE_CAMERA
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_ROOM_USER:
            return {...state, currentParticipants: action.payload}
        case SEND_MESSAGE:
            return {...state, sendMessage: action.payload}
        case ACTIVATE_CAMERA:
            return {...state, isActivateCamera: action.payload}
        case ANSWER_QUESTION:
            return {...state, selectedAnswer: action.payload}            
        case GET_QUESTION:
            return {state, questionList: action.payload}
        case SHOW_QUESTION:
            return {state, currentQuestion: action.payload}
        default:
            return state;
    }
}