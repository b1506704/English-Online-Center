import {
  LOGIN_USER,
  REGISTER_USER,
  GET_USER,
  LOGOUT_USER,
  FETCH_HOUSE,
  DELETE_HOUSE,
  CREATE_HOUSE,
  BUY_HOUSE,
  FILTER_HOUSE,
  UPDATE_HOUSE,
  FILTER_HOUSE_BY_PRICE,
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
    case LOGOUT_USER:
        return { ...state, login: action.payload}  
    case FETCH_HOUSE:
        return { ...state, houseList: action.payload }
    case DELETE_HOUSE:
        return {...state, 
                houseList: state.houseList.filter((house) => house.id != action.payload )
            }
    case CREATE_HOUSE:
        return {
            ...state, 
                houseList:[...state.houseList, action.payload]
            }
    case UPDATE_HOUSE:
        return { ...state, updatedHouse: action.payload}            
    case BUY_HOUSE:
        return { ...state, credit: action.payload }
    case FILTER_HOUSE:
        return { 
            ...state, 
                houseList: state.houseList.filter((house) => house.category === action.payload)
        }
    case FILTER_HOUSE_BY_PRICE:
        return { 
            ...state, 
                houseList: state.houseList.filter((house) => house.price === action.payload)
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
        return { ...state, categoryList: action.payload}
    case DELETE_CATEGORY:
        return { ...state, deleteCategory: action.payload }
    case CREATE_CATEGORY:
        return { ...state, createdCategory: action.payload }
    case UPDATE_CATEGORY:
        return { ...state, updatedCategory: action.payload}                    
    case SET_NOTIFICATION:
        return { ...state, notif: action.payload}
    case SHOW_USER_INFO:
        return { ...state, isShowUserInfo: action.payload}
    default:
        return state;
  }
};

