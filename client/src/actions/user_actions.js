import {
  LOGIN_USER,
  GET_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FETCH_ROOM,
  DELETE_ROOM,
  BUY_ROOM,
  FILTER_ROOM,
  FILTER_ROOM_BY_PRICE,
  CREATE_ROOM,
  UPDATE_ROOM,
  ADD_BANK,
  FETCH_BANK,
  DELETE_BANK,
  CREATE_BANK,
  UPDATE_BANK,
  FETCH_CATEGORY,
  DELETE_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  SET_NOTIFICATION,
  SHOW_USER_INFO
} from '../constants/actionTypes';

import * as api from '../api/index.js';

export const login = (userInfo) => async (dispatch) => {
  try {
    const { data } = await api.login(userInfo);
    await dispatch({ type: LOGIN_USER, payload: data});
    await dispatch(setNotification("Login successfully"));
  } catch (error) {
    dispatch(setNotification("Login failed!"));
  }
};

export const getUser = (userName) => async (dispatch) => {
  try {
    const { data } = await api.getUser(userName);
    dispatch({ type: GET_USER, payload: data});
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = (userInfo) => async (dispatch) => {
  try {
    const { data } = await api.logout(userInfo);
    await dispatch({ type: LOGOUT_USER, payload: data});
    await dispatch({ type: ADD_BANK, payload: null});
  } catch (error) {
    console.log(error.message);
  }
};

export const register = (userInfo) => async (dispatch) => {
  try {
    const { data } = await api.createUser(userInfo);
    await dispatch({ type: REGISTER_USER, payload: data});
    await dispatch(setNotification("Register sucessfully"));
  } catch (error) {
    dispatch(setNotification("Register failed!"));
  }
};

export const addBank = (userName, bankInfo) => async (dispatch) => {
  try {
    const { data } = await api.addBank(userName, bankInfo);
    await dispatch({ type: ADD_BANK, payload: data});
    await dispatch(setNotification("Update successfully"));
  } catch (error) {
    dispatch(setNotification("Update failed!"));
  }
};

export const filterRoom = (courseName) => async (dispatch) => {
  try {
    await dispatch(fetchRoom());
    await dispatch({ type: FILTER_ROOM, payload: courseName});
    await dispatch(setNotification(`Filter with Course= ${courseName} `));
  } catch (error) {
    console.log(error.message);
  }
};

export const filterRoomByPrice = (price) => async (dispatch) => {
  try {
    await dispatch(fetchRoom());
    await dispatch({ type: FILTER_ROOM_BY_PRICE, payload: price});
    await dispatch(setNotification(`Filter with Price= ${price} `));
  } catch (error) {
    console.log(error.message);
  }
};

export const registerRoom = (userName, roomInfo) => async (dispatch) => {
  try {
    const { data } = await api.registerRoom(userName, roomInfo);
    await dispatch({ type: BUY_ROOM, payload: data});
    await dispatch(fetchRoom());
    await dispatch(setNotification("Enroll OK"));
  } catch (error) {
    dispatch(setNotification("Cannot enroll!"));
  }
};

export const fetchRoom = () => async (dispatch) => {
  try {
    const { data } = await api.fetchRoom();
    dispatch({ type: FETCH_ROOM, payload: data});
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteRoom = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteRoom(id);
    await dispatch({ type: DELETE_ROOM, payload: data});
    await dispatch(fetchRoom());
    await dispatch(setNotification(`Deleted room #${id}`));
  } catch (error) {
    dispatch(setNotification("Delete failed!"));
  }
};

export const updateRoom = (id, roomInfo) => async (dispatch) => {
  try {
    const { data } = await api.updateRoom(id, roomInfo);
    await dispatch({ type: UPDATE_ROOM, payload: data});
    await dispatch(fetchRoom());
    await dispatch(setNotification(`Updated room ${id}`));
  } catch (error) {
    dispatch(setNotification("Update failed!"));
  }
};

export const createRoom = (roomInfo) => async (dispatch) => {
  try {
    const { data } = await api.createRoom(roomInfo);
    await dispatch({ type: CREATE_ROOM, payload: data});
    await dispatch(fetchRoom());
    await dispatch(setNotification(`Added room ${roomInfo.id}`));
  } catch (error) {
    dispatch(setNotification("Add failed!"));
  }
};

export const fetchBank = () => async (dispatch) => {
  try {
    const { data } = await api.fetchBank();
    dispatch({ type: FETCH_BANK, payload: data});
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteBank = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteBank(id);
    await dispatch({ type: DELETE_BANK, payload: data});
    await dispatch(fetchBank());
    await dispatch(setNotification(`Delete bank #${id}`));
  } catch (error) {
    dispatch(setNotification("Delete failed!"));
  }
};

export const createBank = (bankInfo) => async (dispatch) => {
  try {
    const { data } = await api.createBank(bankInfo);
    await dispatch({ type: CREATE_BANK, payload: data});
    await dispatch(fetchBank());
    await dispatch(setNotification(`Added bank #${bankInfo.id}`));
  } catch (error) {
    dispatch(setNotification("Add failed!"));
  }
};
export const updateBank = (id, bankInfo) => async (dispatch) => {
  try {
    const { data } = await api.updateBank(id, bankInfo);
    await dispatch({ type: UPDATE_BANK, payload: data});
    await dispatch(fetchBank());
    await dispatch(setNotification(`Updated bank ${id}`));
  } catch (error) {
    dispatch(setNotification("Update failed!"));
  }
};
//course action
export const fetchCourse = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCourse();
    dispatch({ type: FETCH_CATEGORY, payload: data});
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCourse = (name) => async (dispatch) => {
  try {
    const { data } = await api.deleteCourse(name);
    await dispatch({ type: DELETE_CATEGORY, payload: data});
    await dispatch(fetchCourse());
    await dispatch(setNotification(`Deleted course ${id}`));
  } catch (error) {
    dispatch(setNotification("Delete failed!"));
  }
};

export const createCourse = (courseInfo) => async (dispatch) => {
  try {
    const { data } = await api.createCourse(courseInfo);
    await dispatch({ type: CREATE_CATEGORY, payload: data});
    await dispatch(fetchCourse());
    await dispatch(setNotification(`Added course ${courseInfo.name}`));
  } catch (error) {
    dispatch(setNotification("Thêm thất bại"));
  }
};

export const updateCourse = (name, courseInfo) => async (dispatch) => {
  try {
    const { data } = await api.updateCourse(name, courseInfo);
    await dispatch({ type: UPDATE_CATEGORY, payload: data});
    await dispatch(fetchCourse());
    await dispatch(setNotification(`Updated course ${name}`));
  } catch (error) {
    dispatch(setNotification("Update failed!"));
  }
};



export const setNotification = (notification) => async (dispatch) => {
  try {
    dispatch({ type: SET_NOTIFICATION, payload: notification});
  } catch (error) {
    console.log(error.message);
  }
};

export const showMenu = (isShow) => async (dispatch) => {
  try {
    await dispatch({ type: SHOW_USER_INFO, payload: isShow});
  } catch (error) {
    console.log(error.message);
  }
};

