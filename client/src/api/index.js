import axios from 'axios';
// for heroku server
// const userUrl = 'https://account-trading-shop.herokuapp.com/users';
// const roomUrl = 'https://account-trading-shop.herokuapp.com/rooms';
// const classRoomUrl = 'https://account-trading-shop.herokuapp.com/class_rooms';
// const courseUrl = 'https://account-trading-shop.herokuapp.com/courses';
// const bankUrl = 'https://account-trading-shop.herokuapp.com/banks';
// const testUrl = 'https://account-trading-shop.herokuapp.com/tests';
// for local server
const userUrl = 'http://localhost:80/users';
const roomUrl = 'http://localhost:80/rooms';
const courseUrl = 'http://localhost:80/courses';
const bankUrl = 'http://localhost:80/banks';
const classRoomUrl = 'http://localhost:80/class_rooms';
const testUrl = 'http://localhost:80/tests';


// user routes
export const createUser = (newUser) => axios.post(userUrl, newUser);
export const getUser = (userName) => axios.get(`${userUrl}/${userName}`);
export const login = (userInfo) => axios.post(`${userUrl}/${userInfo}`, userInfo);
export const logout = (userInfo) => axios.post(`${userUrl}/logout/${userInfo}`, userInfo);
export const fetchUser = () => axios.get(userUrl);
export const deleteUser = (userName) => axios.delete(`${userUrl}/${userName}`);
export const updateUser = (userName, toUpdateUser) => axios.post(`${userUrl}/updateUser/${userName}`, toUpdateUser);
// room
export const fetchRoom = () => axios.get(roomUrl);
export const createRoom = (newRoom) => axios.post(roomUrl, newRoom);
export const deleteRoom = (id) => axios.delete(`${roomUrl}/${id}`);
export const updateRoom = (id, toUpdateRoom) => axios.post(`${roomUrl}/updateRoom/${id}`, toUpdateRoom);
export const joinRoom = (id, userInfo) => axios.post(`${roomUrl}/joinRoom/${id}`, userInfo);
export const registerRoom = (userName, roomInfo) => axios.post(`${userUrl}/registerRoom/${userName}`, roomInfo);
// test
export const fetchTest = () => axios.get(testUrl);
export const createTest = (newTest) => axios.post(testUrl, newTest);
export const deleteTest = (id) => axios.delete(`${testUrl}/${id}`);
export const updateTest = (id, toUpdateTest) => axios.post(`${testUrl}/updateTest/${id}`, toUpdateTest);
// bank
export const addBank = (userName, bankInfo) => axios.post(`${userUrl}/addBank/${userName}`, bankInfo);
export const createBank = (newBank) => axios.post(bankUrl, newBank);
export const fetchBank = () => axios.get(bankUrl);
export const deleteBank = (id) => axios.delete(`${bankUrl}/${id}`);
export const updateBank = (id, toUpdateBank) => axios.post(`${bankUrl}/updateBank/${id}`, toUpdateBank);
// course
export const createCourse = (newCourse) => axios.post(courseUrl, newCourse);
export const fetchCourse = () => axios.get(courseUrl);
export const deleteCourse = (name) => axios.delete(`${courseUrl}/${name}`);
export const updateCourse = (name, toUpdateCourse) => axios.post(`${courseUrl}/updateCourse/${name}`, toUpdateCourse);
// classroom
export const getRoomUser = () => axios.get(classRoomUrl);

    