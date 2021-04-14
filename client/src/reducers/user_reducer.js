import {
  LOGIN_USER,
  REGISTER_USER,
  GET_USER,
  FETCH_USER,
  LOGOUT_USER,
  FETCH_ROOM,
  DELETE_ROOM,
  CREATE_ROOM,
  BUY_ROOM,
  FILTER_ROOM,
  UPDATE_ROOM,
  FILTER_ROOM_BY_PRICE,
  ADD_BANK,
  CREATE_BANK,
  FETCH_BANK,
  DELETE_BANK,
  UPDATE_BANK,
  CREATE_CATEGORY,
  FETCH_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  SET_NOTIFICATION,
  SHOW_USER_INFO
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER:
        return { ...state, register: action.payload }
    case LOGIN_USER:
        return { ...state, login: action.payload }
    case GET_USER:
        return { ...state, currentUser: action.payload }
    case FETCH_USER:
        return { ...state, userList: action.payload }                
    case LOGOUT_USER:
        return { ...state, login: action.payload}  
    case FETCH_ROOM:
        return { ...state, roomList: action.payload }
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
    case BUY_ROOM:
        return { ...state, credit: action.payload }
    case FILTER_ROOM:
        return { 
            ...state, 
                roomList: state.roomList.filter((room) => room.course === action.payload)
        }
    case FILTER_ROOM_BY_PRICE:
        return { 
            ...state, 
                roomList: state.roomList.filter((room) => room.price === action.payload)
        }
    case FETCH_BANK:
        return { ...state, bankList: action.payload}
    case DELETE_BANK:
        return { ...state, deleteBank: action.payload }
    case CREATE_BANK:
        return { ...state, createdBank: action.payload }        
    case UPDATE_BANK:
        return { ...state, updatedBank: action.payload}            
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
    case SHOW_USER_INFO:
        return { ...state, isShowUserInfo: action.payload}
    default:
        return state;
  }
};

