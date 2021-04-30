import React, {useEffect, useRef, useState} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import { getUser, createRoom, setNotification } from '../../../../actions/user_actions';
import FileBase from 'react-file-base64';
import random from '../../../../utils/RandomNumber';

import './UserInfo.css';

const UserInfo = () => {
    const dispatch = useDispatch();
    const [currentImg, setCurrentImg] = useState(null);
    const currentCourse = useSelector((state) => state.user_reducer.courseList);
    const roomInputRef = 
    {
        courseRef: useRef(null),
        priceRef: useRef(null),
        start: useRef(null),
        end: useRef(null),
    };
    const currentLoginUser = useSelector((state) => state.user_reducer.loggedInUser);
    const user = useSelector((state) => state.user_reducer.currentUser);
    
    useEffect(()=> {
        if (currentLoginUser) {
            dispatch(getUser(currentLoginUser.userName));
        }
    },[currentLoginUser]);

    const onRoomUpload = () => {
        const uploadRoom = 
        {
            id: random(1,10000),  
            price: roomInputRef.priceRef.current.value || null,
            course: roomInputRef.courseRef.current.value || null,
            imgUrl:  currentImg ? currentImg : null,
            roomCoacher:  user ? user.userName : null,
            start: roomInputRef.start.current.value || null,
            end: roomInputRef.end.current.value || null,
        };
        dispatch(createRoom(uploadRoom));
        
    }

    const refresh = () => {
        dispatch(getUser(currentLoginUser.userName))
        .then(() => dispatch(setNotification("Successfully Updated")));
    }

    return(
        <div className="user_info_container shadow">
            <h2 className="icon"> {"||"} </h2>
            <h2 className="title"> User Information  </h2>
            <div className="info_panel">
                <div> 
                    <button type="button" className="shadow refresh_button" onClick={refresh}></button>
                </div>
                
                {currentLoginUser && currentLoginUser.isCoacher === true ?
                <>
                <div> Username: { user ? user.userName : null}</div> 
                <div style={{color: "yellow"}}> Balance: { user ? user.balance : null} VND</div>
                <div> Coaching Rooms: &nbsp; 
                </div> 
                    {
                        user ? user.roomCoachingList.map((e,k) => (<span key={k}>{e}</span>)) : null
                    } 
                </>
                : null}
                
                {currentLoginUser && currentLoginUser.isCoacher === false ?
                    <> 
                        <div> Email: { user ? user.email : null}</div>
                        <div style={{color: "yellow"}}> Series Number: { user ? user.bankID : null}</div>
                        <div style={{color: "yellow"}}> Bank: { user ? user.bankProvider : null}</div>
                        <div style={{color: "yellow"}}> Bank Balance: { user ? user.balance : null} VND</div>
                        <div> Register Rooms: &nbsp; 
                        </div>
                            {
                                user ? user.roomRegisterList.map((e,k) => (<span key={k}>{e}</span>)) : null
                            } 
                    </>
                    : null
                }
            </div>
        </div>
    );
}
export default UserInfo;