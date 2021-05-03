import { React, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import {register, setNotification} from '../../actions/user_actions';
import './RegisterPopup.css';

const RegisterPopup = ({close}) => {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        userName: '',
        passWord: '',
        fullName: '',
        gender: '',
        phoneNumber: '',
        address: '',
        birthDate: '',
        email: '',
        question_1: ''
    });
    const modalRef = useRef();

    useEffect(() => {
        if (userInfo.userName && userInfo.passWord && userInfo.email && userInfo.gender) {
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

                    if (userInfo.gender === '' || e.target.password.value != e.target.re_password.value ) {
                        dispatch(setNotification("Invalid information!"));
                    } else {
                        setUserInfo(
                            {
                                ...userInfo,
                                userName: e.target.username.value,
                                passWord:e.target.password.value,
                                fullName: e.target.full_name.value,
                                phoneNumber: e.target.mobile.value,
                                address: e.target.address.value,
                                birthDate: e.target.address.value,
                                email: e.target.email.value,
                                question_1: e.target.question_1.value
                            }
                        );
                    }
                }}>
                <div>
                    <label>Username:</label>
                    <input type="text" autoFocus={true} required minLength={1} maxLength={8} name="username" placeholder="<=8 letters"></input>
                </div>
                <div>
                    <label>Full Name:</label>
                    <input type="text" required minLength={1} name="full_name"></input>
                </div>
                <div>
                    <label>Male: </label>
                    <input 
                        type="radio" 
                        checked={userInfo.gender === 'Male'} 
                        onChange={() => setUserInfo({...userInfo, gender: 'Male'})}
                        value="male" 
                        name="male">
                    </input>
                    <label>Female: </label>
                    <input 
                        type="radio" 
                        checked={userInfo.gender === 'Female'} 
                        onChange={() => setUserInfo({...userInfo, gender: 'Female'})}
                        value="female" 
                        name="female">
                    </input>
                </div>
                <div>
                    <label>Birthdate:</label>
                    <input type="date" require placeholder="DD-MM-YYYY" name="birth_date"></input>
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" required minLength={1} name="address"></input>
                </div>
                <div>
                    <label>Mobile:</label>
                    <input type="text" required minLength={1} name="mobile"></input>
                </div>
                <div>
                    <label>Password </label>
                     <input type="password" name="password" required minLength={1} maxLength={12} placeholder="<=12 letters"></input>
                </div>
                <div>
                    <label>Re-password</label>
                    <input type="password" name="re_password" required minLength={1} maxLength={12} placeholder="<=12 letters"></input>
                </div>
                <div>
                    <label>Email:</label>
                    <input type="text" required pattern="[A-Za-z0-9]+@gmail.com" placeholder="abc@gmail.com" name="email"></input>
                </div>
                <div>
                    <label>Father's Birthdate:</label>
                    <input type="date" require placeholder="DD-MM-YYYY" name="question_1"></input>
                </div>
                <div className="button_container">
                    <input type="submit" className="shadow" value="OK"></input>
                    <input type="button" className="shadow" value="Close" onClick={close}></input>
                </div>
            </form>
        </div>
    );
}
export default RegisterPopup;