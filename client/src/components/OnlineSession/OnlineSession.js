import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './OnlineSession.css';
import { fetchRoom, getIndex, setNotification } from '../../actions/user_actions';
import FlashCard from '../FlashCard/FlashCard';

const OnlineSession = () => {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const roomList = useSelector((state) => state.user_reducer.roomList);
    const courseList = useSelector((state) => state.user_reducer.courseList);
    const userList = useSelector((state) => state.user_reducer.userList);
    const [contentList, setContentList] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [course, setCourse] = useState(courseList.find((e) => e.id === roomList.find((r) => r.id === id).course));
    const [room, setRoom] = useState(roomList.find((r) => r.id === id));

    useEffect(()=> {
        const currentParticipantIds = roomList.find((r) => r.id === id).roomParticipants;
        const fullOjb = [];
        currentParticipantIds.map((e,key) => {
            fullOjb[key] = userList.find((user) => user.userName === e);
        });
        setParticipants(fullOjb);
        dispatch(fetchRoom());
        const interval = setInterval(() => {
            const currentParticipantIds = roomList.find((r) => r.id === id).roomParticipants;
            const fullOjb = [];
            currentParticipantIds.map((e,key) => {
                fullOjb[key] = userList.find((user) => user.userName === e);
            });
            setParticipants(fullOjb);
            dispatch(fetchRoom());
          }, 3500);
        return () => {
            clearInterval(interval);
        }
    },[]);

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

    const nextLesson = () => {
        if (currentLessonIndex >= contentList?.length -1) {
            dispatch(setNotification("You reach the last lesson!"));
        } else {
            
            setCurrentLessonIndex((index) => index +1);
        }
    }

    const prevLesson = () => {
        if (currentLessonIndex <=0) {
            dispatch(setNotification("You reach the first lesson!"));
        } else {
            
            setCurrentLessonIndex((index) => index - 1);
        }
    }

    const renderBlackBoard = () => {
        const content = <FlashCard
                            dataSource={contentList[currentLessonIndex]?.content}
                            voice={"ja-JP"}
                            flipDirection="vertical" 
                            onChange={(step, side) => console.log(step, side)} 
                            onSound={(text) => console.log(text)} 
                            onFinish={() => console.log("Finish!")}
                            backgroundColor={""}
                            barColor={"rgba(255, 255, 255, 0.527)"}
                            cardColor={"rgba(255, 255, 255, 0.527)"}
                            textColor={"black"}
                            dropShadow={true}
                            height={250}
                            width={"80%"}
                    />;
        return content;
    }

    const renderMessage = () => {

        return message;
    }

    useEffect(()=> {
        setContentList(course?.lessonList);
        console.log(console);
        
    },[]);

    return(
        <main>
            <div className="session_container corner_box corner_box_e shadow">
                <div className="session_title neon shadow">
                    <button className="back_button shadow" type="button" onClick={exitRoom}>{"<"} Back</button>
                    <button className="back_button shadow" type="button" onClick={prevLesson}>{"<"} Lesson</button>
                    <button className="back_button shadow" type="button" onClick={nextLesson}>{">"} Lesson</button>
                    <span>Room No. {id}</span>
                </div>
                <div className="session_coacher shadow neon">
                    {room?.roomCoacher}
                </div>
                <div className="session_board shadow">
                    {/* <div className="black_board">Black Board</div> */}
                    <div className="lesson_title shadow">{currentLessonIndex+1}.{contentList?.[currentLessonIndex]?.name}</div>
                    {renderBlackBoard()}
                </div>
                <div className="session_user shadow">
                    {renderUser()}
                </div>
            </div>
        </main>
    );
}
export default OnlineSession;