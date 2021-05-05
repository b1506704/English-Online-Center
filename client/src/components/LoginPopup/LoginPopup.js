import { React, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {login} from '../../actions/user_actions';
import * as auth from '../../utils/FakeAuth.js';
import './LoginPopup.css';

const LoginPopup = ({close}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const loginInfo = useSelector((state) => state.user_reducer.loggedInUser);
    const [userInfo, setUserInfo] = useState({
        userName: '',
        passWord: '',
    });
    const [newUserInfo, setNewUserInfo] = useState({
        userName: '',
        passWord: '',
        question_1:''
    });
    const [isForget, setIsForget] = useState(false);
    const [isRemember, setIsRemember] = useState(false);
    const modalRef = useRef();

    useEffect(() => {
        if (userInfo.userName && userInfo.passWord) {
            dispatch(login(userInfo));
        }
    },[userInfo, setUserInfo]);

    useEffect(() => {
        if (newUserInfo.userName && newUserInfo.passWord && newUserInfo.question_1) {
            dispatch(setNewPassword(newUserInfo.userName, newUserInfo));
        }
    },[newUserInfo, setNewUserInfo]);
    
    // useEffect (() => {
    //     if (loginInfo) {
    //         if (auth.isHRManager(loginInfo)) history.push('/hr');
    //         if (auth.isSalesManager(loginInfo)) history.push('/sales');
    //         if (auth.isCoacher(loginInfo)) history.push('/coacher');
    //         if (auth.isUser(loginInfo)) history.push('/user');
    //         if (auth.isAcademicManager(loginInfo)) history.push('/academic');
    //         if (auth.isCenterManager(loginInfo)) history.push('/center');
    //         if (auth.isMarketingManager(loginInfo)) history.push('/marketing');
    //     } 
    // },[loginInfo]);
    
    useEffect(() => {
        scrollToModal();
    });
    
    
    const scrollToModal = () => {
        modalRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start", 
          inline: "nearest"
        });
      };
    

    return(
        <div id="login" className="login_container shadow">
            <div ref={modalRef} className="scroll_position_holder"></div>
            <h1>{isForget ? "Forget Password" : "Login"}</h1>
            <form onSubmit={(e) => {
                    e.preventDefault();
                    if (isForget === false) {
                        setUserInfo({userName: e.target.username.value, passWord:e.target.password.value});
                    } else {
                        setNewUserInfo({userName: e.target.username.value, passWord:e.target.new_password.value, question_1:e.target.question_1.value});
                        setIsForget(false);
                        dispatch(setNotification("Set new password successfully"));
                    }
                }}>
                <div>
                    <label>Username:</label>
                    <input type="text" autoFocus={true} required minLength={1} maxLength={8} placeholder="<=8 letters" name="username"></input>
                </div>
                { isForget === false ? 
                <>
                    <div>
                        <label>Password:</label>
                        <input type="password" required minLength={1} maxLength={8} placeholder="<=8 letters" name="password"></input>
                    </div>
                    <div>
                        <label style={{fontSize: "15px"}}>Remember Me:</label>
                        <input type="checkbox" name="remember_acc" onClick={() => setIsRemember(true)}></input>
                        <a style={{fontSize: "15px"}} onClick={() => setIsForget(true)}>Forget Password</a>
                    </div>
                </> 
                : 
                <>
                    <div>
                        <label>Father's Birthdate:</label>
                        <input type="date" require placeholder="DD-MM-YYYY" name="question_1"></input>
                    </div>
                    <div>
                        <label>New Password:</label>
                        <input type="password" required minLength={1} maxLength={8} placeholder="<=8 letters" name="new_password"></input>
                    </div>
                    <div>
                        <a onClick={() => setIsForget(false)}> || Back to Login ||</a>
                    </div>
                </>
                }
                <div className="button_container">
                    <input type="submit" className="shadow" value="OK"></input>
                    <input type="button" className="shadow" value="Close" onClick={close}></input>
                </div>
            </form>
        </div>
    );
}
export default LoginPopup;