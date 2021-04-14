import {
  LOGIN_USER,
  GET_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FETCH_HOUSE,
  DELETE_HOUSE,
  BUY_HOUSE,
  FILTER_HOUSE,
  FILTER_HOUSE_BY_PRICE,
  CREATE_HOUSE,
  UPDATE_HOUSE,
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
    await dispatch(setNotification("Đăng nhập thành công"));
  } catch (error) {
    dispatch(setNotification("Đăng nhập thất bại"));
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
    await dispatch(setNotification(`Đăng ký thành công`));
  } catch (error) {
    dispatch(setNotification("Đăng ký thất bại"));
  }
};

export const addBank = (userName, bankInfo) => async (dispatch) => {
  try {
    const { data } = await api.addBank(userName, bankInfo);
    await dispatch({ type: ADD_BANK, payload: data});
    await dispatch(setNotification("Cập nhật thành công"));
  } catch (error) {
    dispatch(setNotification("Cập nhật thất bại"));
  }
};

export const filterHouse = (categoryName) => async (dispatch) => {
  try {
    await dispatch(fetchHouse());
    await dispatch({ type: FILTER_HOUSE, payload: categoryName});
    await dispatch(setNotification(`Duyệt theo ${categoryName} `));
  } catch (error) {
    console.log(error.message);
  }
};

export const filterHouseByPrice = (price) => async (dispatch) => {
  try {
    await dispatch(fetchHouse());
    await dispatch({ type: FILTER_HOUSE_BY_PRICE, payload: price});
    await dispatch(setNotification(`Duyệt theo giá: ${price} `));
  } catch (error) {
    console.log(error.message);
  }
};

export const buyHouse = (userName, houseInfo) => async (dispatch) => {
  try {
    const { data } = await api.buyHouse(userName, houseInfo);
    await dispatch({ type: BUY_HOUSE, payload: data});
    await dispatch(fetchHouse());
    await dispatch(setNotification("Mua thành công"));
  } catch (error) {
    dispatch(setNotification("Mua thất bại"));
  }
};

export const fetchHouse = () => async (dispatch) => {
  try {
    const { data } = await api.fetchHouse();
    dispatch({ type: FETCH_HOUSE, payload: data});
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteHouse = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteHouse(id);
    await dispatch({ type: DELETE_HOUSE, payload: data});
    await dispatch(fetchHouse());
    await dispatch(setNotification("Xóa hoàn tất"));
  } catch (error) {
    dispatch(setNotification("Xóa thất bại"));
  }
};

export const updateHouse = (id, houseInfo) => async (dispatch) => {
  try {
    const { data } = await api.updateHouse(id, houseInfo);
    await dispatch({ type: UPDATE_HOUSE, payload: data});
    await dispatch(fetchHouse());
    await dispatch(setNotification("Cập nhật hoàn tất"));
  } catch (error) {
    dispatch(setNotification("Cập nhật thất bại"));
  }
};

export const createHouse = (houseInfo) => async (dispatch) => {
  try {
    const { data } = await api.createHouse(houseInfo);
    await dispatch({ type: CREATE_HOUSE, payload: data});
    await dispatch(fetchHouse());
    await dispatch(setNotification("Thêm hoàn tất"));
  } catch (error) {
    dispatch(setNotification("Thêm thất bại"));
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
    await dispatch(setNotification("Xóa hoàn tất"));
  } catch (error) {
    dispatch(setNotification("Xóa thất bại"));
  }
};

export const createBank = (bankInfo) => async (dispatch) => {
  try {
    const { data } = await api.createBank(bankInfo);
    await dispatch({ type: CREATE_BANK, payload: data});
    await dispatch(fetchBank());
    await dispatch(setNotification("Thêm hoàn tất"));
  } catch (error) {
    dispatch(setNotification("Thêm thất bại"));
  }
};
export const updateBank = (id, bankInfo) => async (dispatch) => {
  try {
    const { data } = await api.updateBank(id, bankInfo);
    await dispatch({ type: UPDATE_BANK, payload: data});
    await dispatch(fetchBank());
    await dispatch(setNotification("Cập nhật hoàn tất"));
  } catch (error) {
    dispatch(setNotification("Cập nhật thất bại"));
  }
};
//category action
export const fetchCategory = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCategory();
    dispatch({ type: FETCH_CATEGORY, payload: data});
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCategory = (name) => async (dispatch) => {
  try {
    const { data } = await api.deleteCategory(name);
    await dispatch({ type: DELETE_CATEGORY, payload: data});
    await dispatch(fetchCategory());
    await dispatch(setNotification("Xóa hoàn tất"));
  } catch (error) {
    dispatch(setNotification("Xóa thất bại"));
  }
};

export const createCategory = (categoryInfo) => async (dispatch) => {
  try {
    const { data } = await api.createCategory(categoryInfo);
    await dispatch({ type: CREATE_CATEGORY, payload: data});
    await dispatch(fetchCategory());
    await dispatch(setNotification("Thêm hoàn tất"));
  } catch (error) {
    dispatch(setNotification("Thêm thất bại"));
  }
};

export const updateCategory = (name, categoryInfo) => async (dispatch) => {
  try {
    const { data } = await api.updateCategory(name, categoryInfo);
    await dispatch({ type: UPDATE_CATEGORY, payload: data});
    await dispatch(fetchCategory());
    await dispatch(setNotification("Cập nhật hoàn tất"));
  } catch (error) {
    dispatch(setNotification("Cập nhật thất bại"));
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

