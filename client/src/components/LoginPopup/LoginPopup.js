import { React, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {login} from '../../actions/user_actions';
import * as auth from '../../utils/FakeAuth.js';
import './LoginPopup.css';

const LoginPopup = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const loginInfo = useSelector((state) => state.user_reducer.login);
    const [userInfo, setUserInfo] = useState({
        userName: '',
        passWord: ''
    });
    const modalRef = useRef();

    useEffect(() => {
        if (userInfo.userName && userInfo.passWord) {
            dispatch(login(userInfo));
        }
    },[userInfo, setUserInfo]);
    
    useEffect (() => {
        if (loginInfo) {
            if (auth.isHRManager(loginInfo)) history.push('/hr');
            if (auth.isSalesManager(loginInfo)) history.push('/sales');
            if (auth.isCoacher(loginInfo)) history.push('/coacher');
            if (auth.isUser(loginInfo)) history.push('/user');
            if (auth.isAcademicManager(loginInfo)) history.push('/academic');
            if (auth.isCenterManager(loginInfo)) history.push('/center');
            if (auth.isMarketingManager(loginInfo)) history.push('/marketing');
        } 
    },[loginInfo]);
    
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
        <div className="login_container drop_shadow">
            <div ref={modalRef} className="scroll_position_holder"></div>
            <h1>Login</h1>
            <form onSubmit={(e) => {
                    e.preventDefault();
                    setUserInfo({userName: e.target.username.value, passWord:e.target.password.value});
                }}>
                <div>
                    <label>Username:</label>
                    <input type="text" autoFocus={true} name="username"></input>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password"></input>
                </div>
                <div className="button_container">
                    <input type="submit" className="drop_shadow neon_effect" value="Login"></input>
                    <input type="button" className="drop_shadow neon_effect" value="Close" onClick={props.close}></input>
                </div>
            </form>
        </div>
    );
}
export default LoginPopup;