import React, {useEffect, useRef, useState} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import FileBase from 'react-file-base64';
import { getUser, updateUser } from '../../../../actions/user_actions';

import './UserInfo.css';

const UserInfo = () => {
    const dispatch = useDispatch();
    const [currentImg, setCurrentImg] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const userInputRef = 
    {
        fullName: useRef(null),
        email: useRef(null),
        passWord: useRef(null),
        address: useRef(null),
        gender: useRef(null),
        phoneNumber: useRef(null),
        birthDate: useRef(null)
    };
    const currentLoginUser = useSelector((state) => state.user_reducer.loggedInUser);
    const user = useSelector((state) => state.user_reducer.currentUser);
    
    useEffect(()=> {
        if (currentLoginUser) {
            dispatch(getUser(currentLoginUser.userName));
        }
    },[currentLoginUser]);
    const onProfileEdit = () => {
        setIsEditing(true);
    }
    const onProfileCancel = () => {
        setIsEditing(false);
    }

    const onProfileUpdate = (e) => {
        e.preventDefault();
        const updatedUser = 
        {
            userName: user.userName,
            fullName: userInputRef.fullName.current.value ,
            imgUrl:  currentImg ? currentImg : user.imgUrl,
            email:  userInputRef.email.current.value ,
            passWord: userInputRef.passWord.current.value ,
            gender: userInputRef.gender.current.value ,
            address: userInputRef.address.current.value ,
            phoneNumber: userInputRef.phoneNumber.current.value ,
            birthDate: userInputRef.birthDate.current.value
        };
        dispatch(updateUser(user.userName, updatedUser))
        .then(() => setIsEditing(false));
    }

    return(
        <div className="user_info_container shadow">
            <h2 className="icon shadow"> {"||"} </h2>
            <h2 className="user_title"> User Information  </h2>
            <form className="info_panel" onSubmit={(e) => onProfileUpdate(e)}>
                <div className="user_img">
                    <img className="img shadow" src={currentImg || user?.imgUrl}></img>
                    <h2 className="neon"> {user?.userName}</h2> 
                    { isEditing ? 
                    <FileBase className="base64" type="file" multiple={false} onDone = {({base64}) => {setCurrentImg(base64)}}></FileBase>  
                    : null
                    }
                    
                </div>
                <div style={{display: "block", textAlign:"center", backgroundColor: "rgb(184, 201, 255)"}}> Account </div>
                <div> <span>Password: &nbsp;</span>
                    { isEditing === false ? "********"
                    : (<input ref={userInputRef.passWord} type="password" autoFocus={true} required maxLength={12} defaultValue={user?.passWord}></input>)
                    }
                </div>
                <div> <span>Full Name: &nbsp;</span>
                        { isEditing === false ? user?.fullName
                        : (<input ref={userInputRef.fullName} type="text" required defaultValue={user?.fullName}></input>)
                        }
                </div>
                <div> <span>Mobile: &nbsp;</span>
                        { isEditing === false ? user?.phoneNumber
                        : (<input ref={userInputRef.phoneNumber} type="text" required defaultValue={user?.phoneNumber}></input>)
                        }
                </div>
                <div> Birth Date: &nbsp;
                        { isEditing === false ? <span>{user?.birthDate}</span>
                        : (<input ref={userInputRef.birthDate} type="date" required defaultValue={user?.birthDate}></input>)
                        }
                </div>
                <div> Address: &nbsp;
                        { isEditing === false ? <span>{user?.address}</span>
                        : (<input ref={userInputRef.address} type="text" required defaultValue={user?.address}></input>)
                        }
                </div>
                <div> <span>Email: &nbsp;</span>
                        { isEditing === false ? user?.email
                        : (<input ref={userInputRef.email} type="text"  required pattern="[A-Za-z0-9]+@gmail.com" defaultValue={user?.email}></input>)
                        }
                </div>
                <div> <span>Gender: &nbsp;</span>
                        { isEditing === false ? user?.gender
                        : 
                        (<select ref={userInputRef.gender} type="select" required defaultValue={user?.gender}>
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                        </select>)
                        }
                </div>
                <div style={{display: "block", textAlign:"center", backgroundColor: "rgb(184, 201, 255)"}}> Bank </div>
                <div> ID: <span>{ user?.bankID } </span></div>
                <div> Provider: <span>{ user?.bankProvider } </span></div>
                <div> Balance: <span>{ user?.balance} VND &nbsp;</span></div>
                {currentLoginUser && currentLoginUser.isCoacher === true ?
                    <>
                    <div> Coaching Rooms: &nbsp; 
                    </div> 
                        {
                            user?.roomCoachingList.map((e,k) => (<a key={k}>{e}</a>))
                        } 
                    </>
                    : 
                    <> 
                        <div> Register Rooms: &nbsp; 
                        </div>
                            {
                                user?.roomRegisterList.map((e,k) => (<a key={k}>{e}</a>))
                            }
                    </> 
                }
                <div>
                    {isEditing ? 
                    <>
                    <button type="button" className="shadow cancel_button" onClick={onProfileCancel}></button>
                    <button type="submit" className="shadow save_button"></button>
                    </>
                    : <button type="button" className="shadow edit_button" onClick={onProfileEdit}></button>
                    }
                </div>
            </form>
        </div>
    );
}
export default UserInfo;