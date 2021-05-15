import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './OnlineSession.css';
import random from '../../utils/RandomNumber.js';
import { fetchLesson, fetchRoom, setNotification, updateLesson } from '../../actions/user_actions';
import LazyLoad from '../../utils/LazyLoad/LazyLoad';
// import FlashCard from '../FlashCard/FlashCard';
// import Vocabulary from '../../assets/imgs/vocabulary.jpg';
// import Grammar from '../../assets/imgs/grammar.jpg';
// import Listening from '../../assets/imgs/listening.jpg';
// import Reading from '../../assets/imgs/reading.jpg';

const OnlineSession = () => {
    // id = current room id
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const modalRef = useRef();
    const roomList = useSelector((state) => state.user_reducer.roomList);
    const lessonList = useSelector((state) => state.user_reducer.lessonList);
    const testList = useSelector((state) => state.user_reducer.testList);
    const userList = useSelector((state) => state.user_reducer.userList);
    const [contentList, setContentList] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [lesson, setLesson] = useState(null);
    const [room, setRoom] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(()=> {
        setRoom(roomList.find((r) => r.id === id));
    },[]);

    useEffect(()=> {
        const interval = setInterval(() => {
            const currentParticipantIds = roomList.find((r) => r.id === id).roomParticipants;
            const fullOjb = [];
            currentParticipantIds.map((e,key) => {
                fullOjb[key] = userList.find((user) => user.userName === e);
            });
            setParticipants(fullOjb);
            dispatch(fetchRoom());
          }, 3000);
        return () => {
            clearInterval(interval);
        }
    },[roomList]);

    const exitRoom = () => {
        history.push(`/user/room/${id}`);
        dispatch(setNotification("Successfully left the room"));
    }

    const renderUser = () => {
        const users = participants.map((user, key) => 
        (<div key={key} className="participant shadow">
            {user.userName}
        </div>));   
        return users;
    }

    const renderMessage = () => {

        return message;
    }

    return(
        <main>
            <div className="session_container corner_box corner_box_e shadow">
                <div className="session_title neon shadow">
                    <button className="back_button shadow" type="button" onClick={exitRoom}>{"<"} Back</button>
                    <span>Room No. {id}</span>
                </div>
                <div className="session_coacher shadow neon">
                    {room?.roomCoacher}
                </div>
                <div className="session_board shadow">
                    Black Board
                </div>
                <div className="session_user shadow">
                    {renderUser()}
                </div>
            </div>
        </main>
    );
}
export default OnlineSession;