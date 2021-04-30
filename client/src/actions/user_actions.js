import {
  LOGIN_USER,
  GET_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FETCH_ROOM,
  DELETE_ROOM,
  REGISTER_ROOM,
  JOIN_ROOM,
  FILTER_ROOM,
  FILTER_ROOM_BY_ID,
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
  SHOW_USER_INFO,
  IS_LOADING
} from '../constants/actionTypes';

import * as api from '../api/index.js';

export const login = (userInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.login(userInfo);
    localStorage.setItem('user', JSON.stringify(data));
    await dispatch({ type: LOGIN_USER, payload: data});
    await dispatch(setIsLoading(false));
    await dispatch(setNotification("Login successfully"));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Login failed!"));
  }
};

export const getUser = (userName) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.getUser(userName);
    await dispatch(setIsLoading(false));
    dispatch({ type: GET_USER, payload: data});
  } catch (error) {
    dispatch(setIsLoading(false));
    console.log(error.message);
  }
};

export const logout = (userInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    localStorage.clear();
    const { data } = await api.logout(userInfo);
    await dispatch({ type: LOGOUT_USER, payload: data});
    await dispatch(setIsLoading(false));
    await dispatch({ type: ADD_BANK, payload: null});
  } catch (error) {
    dispatch(setIsLoading(false));
    console.log(error.message);
  }
};

export const register = (userInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.createUser(userInfo);
    await dispatch({ type: REGISTER_USER, payload: data});
    await dispatch(setIsLoading(false));
    await dispatch(setNotification("Register sucessfully"));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Register failed!"));
  }
};

export const addBank = (userName, bankInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.addBank(userName, bankInfo);
    await dispatch({ type: ADD_BANK, payload: data});
    await dispatch(setIsLoading(false));
    await dispatch(setNotification("Update successfully"));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Update failed!"));
  }
};

export const filterRoom = (courseName) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    await dispatch(fetchRoom());
    await dispatch({ type: FILTER_ROOM, payload: courseName});
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`Filter with Course= ${courseName} `));
  } catch (error) {
    dispatch(setIsLoading(false));
    console.log(error.message);
  }
};

export const filterRoomByPrice = (price) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    await dispatch(fetchRoom());
    await dispatch({ type: FILTER_ROOM_BY_ID, payload: price});
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`Filter with Price= ${price} `));
  } catch (error) {
    dispatch(setIsLoading(false));
    console.log(error.message);
  }
};

export const registerRoom = (userName, roomInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.registerRoom(userName, roomInfo);
    await dispatch({ type: REGISTER_ROOM, payload: data});
    await dispatch(fetchRoom());
    await dispatch(setIsLoading(false));
    await dispatch(setNotification("Enroll OK"));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Cannot enroll!"));
  }
};
//todo
export const joinRoom = (userName, roomInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    // const { data } = await api.registerRoom(userName, roomInfo);
    await dispatch({ type: JOIN_ROOM, payload: roomInfo});
    await dispatch(fetchRoom());
    await dispatch(setIsLoading(false));
    await dispatch(setNotification("Join room successfully"));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Cannot join!"));
  }
};

export const fetchRoom = () => async (dispatch) => {
  try {
    // await dispatch(setIsLoading(true));
    const { data } = await api.fetchRoom();
    // await dispatch(setIsLoading(false));
    dispatch({ type: FETCH_ROOM, payload: data});
  } catch (error) {
    dispatch(setIsLoading(false));
    console.log(error.message);
  }
};

export const deleteRoom = (id) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.deleteRoom(id);
    await dispatch({ type: DELETE_ROOM, payload: data});
    await dispatch(fetchRoom());
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`Deleted room #${id}`));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Delete failed!"));
  }
};

export const updateRoom = (id, roomInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.updateRoom(id, roomInfo);
    await dispatch({ type: UPDATE_ROOM, payload: data});
    await dispatch(fetchRoom());
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`Updated room ${id}`));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Update failed!"));
  }
};

export const createRoom = (roomInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.createRoom(roomInfo);
    await dispatch({ type: CREATE_ROOM, payload: data});
    await dispatch(setNotification(`Added room ${roomInfo.id}`));
    await dispatch(fetchRoom());
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Add failed!"));
  }
};

export const fetchBank = () => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.fetchBank();
    dispatch({ type: FETCH_BANK, payload: data});
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
    console.log(error.message);
  }
};

export const deleteBank = (id) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.deleteBank(id);
    await dispatch({ type: DELETE_BANK, payload: data});
    await dispatch(fetchBank());
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`Delete bank #${id}`));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Delete failed!"));
  }
};

export const createBank = (bankInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.createBank(bankInfo);
    await dispatch({ type: CREATE_BANK, payload: data});
    await dispatch(fetchBank());
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`Added bank #${bankInfo.id}`));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Add failed!"));
  }
};
export const updateBank = (id, bankInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.updateBank(id, bankInfo);
    await dispatch({ type: UPDATE_BANK, payload: data});
    await dispatch(fetchBank());
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`Updated bank ${id}`));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Update failed!"));
  }
};
//course action
export const fetchCourse = () => async (dispatch) => {
  try {
    // await dispatch(setIsLoading(true));
    const { data } = await api.fetchCourse();
    dispatch({ type: FETCH_CATEGORY, payload: data});
    // await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
    console.log(error.message);
  }
};

export const deleteCourse = (name) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.deleteCourse(name);
    await dispatch({ type: DELETE_CATEGORY, payload: data});
    await dispatch(fetchCourse());
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`Deleted course ${name}`));
  } catch (error) {
    console.log(error.message);
    dispatch(setIsLoading(false));
    dispatch(setNotification("Delete failed!"));
  }
};

export const createCourse = (courseInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.createCourse(courseInfo);
    await dispatch({ type: CREATE_CATEGORY, payload: data});
    await dispatch(fetchCourse());
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`Added course ${courseInfo.name}`));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Thêm thất bại"));
  }
};

export const updateCourse = (name, courseInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.updateCourse(name, courseInfo);
    await dispatch({ type: UPDATE_CATEGORY, payload: data});
    await dispatch(fetchCourse());
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`Updated course ${name}`));
  } catch (error) {
    dispatch(setIsLoading(false));
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

export const setIsLoading = (isLoading) => async (dispatch) => {
  try {
    dispatch({ type: IS_LOADING, payload: isLoading});
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

