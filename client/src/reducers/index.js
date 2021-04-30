import { combineReducers } from 'redux';
import user_reducer from './user_reducer';
import classroom_reducer from './classroom_reducer';
export const reducers = combineReducers({ user_reducer, classroom_reducer });
