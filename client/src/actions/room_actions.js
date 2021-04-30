import {
    SEND_MESSAGE,
    ANSWER_QUESTION,
    GET_ROOM_USER,
    SHOW_QUESTION,
    GET_QUESTION,
    ACTIVATE_CAMERA
} from '../constants/actionTypes';

import * as api from '../api/index.js';
  
export const getRoomUser = () => async (dispatch) => {
    try {
      await dispatch(setIsLoading(true));
      const { data } = await api.getRoomUser();
      await dispatch(setIsLoading(false));
      dispatch({ type: GET_ROOM_USER, payload: data});
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error.message);
    }
};