import { React, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import {register} from '../../actions/user_actions';
import './RegisterPage.css';

const RegisterPage = ({close}) => {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        userName: '',
        passWord: '',
        email: ''
    });
    const modalRef = useRef();

    useEffect(() => {
        if (userInfo.userName && userInfo.passWord && userInfo.email) {
            dispatch(register(userInfo));
        }
    },[userInfo, setUserInfo]);

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
        <div className="register_container shadow">
            <div ref={modalRef} className="scroll_position_holder"></div>
            <h1>Register</h1>
            <form onSubmit={(e) => {
                    e.preventDefault();
                    setUserInfo({userName: e.target.username.value, passWord:e.target.password.value, email: e.target.email.value});
                }}>
                <div>
                    <label>Username:</label>
                    <input type="text" autoFocus={true} name="username" placeholder="<=8 letters"></input>
                </div>
                <div>
                    <label>Password </label>
                     <input type="password" name="password" placeholder="<=12 letters"></input>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" name="email"></input>
                </div>
                <div className="button_container">
                    <input type="submit" className="shadow" value="Register"></input>
                    <input type="button" className="shadow" value="Close" onClick={close}></input>
                </div>
            </form>
        </div>
    );
}
export default RegisterPage;