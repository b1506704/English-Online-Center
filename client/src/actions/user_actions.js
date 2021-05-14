import {
  LOGIN_USER,
  GET_USER,
  REGISTER_USER,
  LOGOUT_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_TEST,
  DELETE_TEST,
  UPDATE_TEST,
  CREATE_TEST,
  FETCH_ROOM,
  DELETE_ROOM,
  REGISTER_ROOM,
  JOIN_ROOM,
  FILTER_ROOM,
  FILTER_ROOM_BY_ID,
  CREATE_ROOM,
  UPDATE_ROOM,
  ADD_BANK,
  FETCH_CATEGORY,
  DELETE_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  SET_NOTIFICATION,
  SHOW_USER_INFO,
  IS_LOADING,
  FETCH_USER
} from '../constants/actionTypes';

import * as api from '../api/index.js';

export const login = (userInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.login(userInfo);
    localStorage.setItem('user', JSON.stringify(data));
    await dispatch({ type: LOGIN_USER, payload: data});
    await dispatch(fetchUser());
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

export const fetchUser = () => async (dispatch) => {
  try {
    // await dispatch(setIsLoading(true));
    const { data } = await api.fetchUser();
    // await dispatch(setIsLoading(false));
    dispatch({ type: FETCH_USER, payload: data});
  } catch (error) {
    dispatch(setIsLoading(false));
    console.log(error.message);
  }
};

export const deleteUser = (userName) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.deleteUser(userName);
    await dispatch({ type: DELETE_USER, payload: data});
    await dispatch(fetchUser());
    await dispatch(setNotification("Deleted"));
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Xóa thất bại"));
  }
};

export const updateUser = (userName, userInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.updateUser(userName, userInfo);
    await dispatch({ type: UPDATE_USER, payload: data});
    await dispatch(setNotification("Cập nhật hoàn tất"));
    await dispatch(fetchUser());
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Cập nhật thất bại"));
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
    await dispatch(setNotification("Register sucessfully"));
    await dispatch(fetchUser());
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Register failed!"));
  }
};
// bank
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
// test
export const fetchTest = () => async (dispatch) => {
  try {
    // await dispatch(setIsLoading(true));
    const { data } = await api.fetchTest();
    // await dispatch(setIsLoading(false));
    dispatch({ type: FETCH_TEST, payload: data});
  } catch (error) {
    dispatch(setIsLoading(false));
    console.log(error.message);
  }
};

export const deleteTest = (id) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.deleteTest(id);
    await dispatch({ type: DELETE_TEST, payload: data});
    await dispatch(fetchTest());
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`Deleted test #${id}`));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Delete failed!"));
  }
};

export const updateTest = (id, testInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.updateTest(id, testInfo);
    await dispatch({ type: UPDATE_TEST, payload: data});
    await dispatch(fetchRoom());
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`Updated test ${id}`));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Update failed!"));
  }
};

export const createTest = (testInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.createTest(testInfo);
    await dispatch({ type: CREATE_TEST, payload: data});
    await dispatch(setNotification(`Added test ${testInfo.id}`));
    await dispatch(fetchRoom());
    await dispatch(setIsLoading(false));
  } catch (error) {
    dispatch(setNotification("Added failed!"));
  }
};
// room
export const filterRoom = (courseName) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    await dispatch(fetchRoom());
    await dispatch({ type: FILTER_ROOM, payload: courseName});
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`Course ${courseName} selected`));
  } catch (error) {
    dispatch(setIsLoading(false));
    console.log(error.message);
  }
};

export const filterRoomById = (id) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    await dispatch(fetchRoom());
    await dispatch({ type: FILTER_ROOM_BY_ID, payload: id});
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`Room ${id} selected `));
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
export const joinRoom = (id, userInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.joinRoom(id, userInfo);
    await dispatch({ type: JOIN_ROOM, payload: data});
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
    dispatch(setNotification("Added failed!"));
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

export const deleteCourse = (id) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.deleteCourse(id);
    await dispatch({ type: DELETE_CATEGORY, payload: data});
    await dispatch(fetchCourse());
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`Deleted course`));
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
    await dispatch(setNotification(`Added course`));
  } catch (error) {
    dispatch(setIsLoading(false));
    dispatch(setNotification("Thêm thất bại"));
  }
};

export const updateCourse = (id, courseInfo) => async (dispatch) => {
  try {
    await dispatch(setIsLoading(true));
    const { data } = await api.updateCourse(id, courseInfo);
    await dispatch({ type: UPDATE_CATEGORY, payload: data});
    await dispatch(fetchCourse());
    await dispatch(setIsLoading(false));
    await dispatch(setNotification(`Updated course`));
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

