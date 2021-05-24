import {
  LOGIN_USER,
  REGISTER_USER,
  GET_USER,
  FETCH_USER,
  DELETE_USER,
  UPDATE_USER,
  RESET_USER,
  LOGOUT_USER,
  FETCH_TEST,
  CREATE_TEST,
  DELETE_TEST,
  UPDATE_TEST,
  TAKE_TEST,
  FETCH_LESSON,
  CREATE_LESSON,
  DELETE_LESSON,
  UPDATE_LESSON,
  FETCH_ROOM,
  DELETE_ROOM,
  CREATE_ROOM,
  REGISTER_ROOM,
  FILTER_ROOM,
  UPDATE_ROOM,
  FILTER_ROOM_BY_ID,
  ADD_BANK,
  CREATE_CATEGORY,
  FETCH_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  SET_NOTIFICATION,
  SHOW_USER_INFO,
  IS_LOADING,
  JOIN_ROOM,
  OPEN_PAYPAL
} from '../constants/actionTypes';
const loggedInUser = JSON.parse(localStorage.getItem('user'));
export default (state = { loggedInUser }, action) => {
  switch (action.type) {
    case REGISTER_USER:
        return { ...state, register: action.payload }
    case LOGIN_USER:
        return { ...state, loggedInUser: action.payload }
    case GET_USER:
        return { ...state, currentUser: action.payload }
    case FETCH_USER:
        return { ...state, userList: action.payload }                
    case DELETE_USER:
        return {...state, 
                userList: state.userList.filter((user) => user.userName != action.payload )
            }
    case UPDATE_USER:
        return { ...state, updatedUser: action.payload}            
    case RESET_USER:
        return { ...state, resetUser: action.payload}            
    case LOGOUT_USER:
        return { ...state, loggedInUser: action.payload}  
    case FETCH_ROOM:
        return { ...state, roomList: action.payload }
    case JOIN_ROOM:
        return { ...state, currentRoom: action.payload }
    case DELETE_ROOM:
        return {...state, 
                roomList: state.roomList.filter((room) => room.id != action.payload )
            }
    case CREATE_ROOM:
        return {
            ...state, 
                roomList:[...state.roomList, action.payload]
            }
    case UPDATE_ROOM:
        return { ...state, updatedRoom: action.payload}            
    case FETCH_TEST:
        return { ...state, testList: action.payload }
    case DELETE_TEST:
        return {...state, 
                testList: state.testList.filter((test) => test.id != action.payload )
            }
    case CREATE_TEST:
        return {
            ...state, 
                testList:[...state.testList, action.payload]
            }
    case UPDATE_TEST:
        return { ...state, updatedTest: action.payload} 
    case TAKE_TEST:
        return { ...state, takeTest: action.payload}           
    case FETCH_LESSON:
        return { ...state, lessonList: action.payload }
    case DELETE_LESSON:
        return {...state, 
                lessonList: state.lessonList.filter((lesson) => lesson.id != action.payload )
            }
    case CREATE_LESSON:
        return {
            ...state, 
                lessonList:[...state.lessonList, action.payload]
            }
    case UPDATE_LESSON:
        return { ...state, updatedLesson: action.payload}                    
    case REGISTER_ROOM:
        return { ...state, credit: action.payload }
    case FILTER_ROOM:
        return { 
            ...state, 
                roomList: state.roomList.filter((room) => room.course === action.payload)
        }
    case FILTER_ROOM_BY_ID:
        return { 
            ...state, 
                roomList: state.roomList.filter((room) => room.id === action.payload)
        }
    case ADD_BANK:
        return { ...state, credit: action.payload}
    case FETCH_CATEGORY:
        return { ...state, courseList: action.payload}
    case DELETE_CATEGORY:
        return { ...state, deleteCourse: action.payload }
    case CREATE_CATEGORY:
        return { ...state, createdCourse: action.payload }
    case UPDATE_CATEGORY:
        return { ...state, updatedCourse: action.payload}                    
    case SET_NOTIFICATION:
        return { ...state, notif: action.payload}
    case OPEN_PAYPAL:
        return { ...state, isOpenPaypal: action.payload}
    case SHOW_USER_INFO:
        return { ...state, isShowUserInfo: action.payload}
    case IS_LOADING:
        return { ...state, isLoading: action.payload}
    default:
        return state;
  }
};

