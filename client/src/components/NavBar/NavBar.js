import { React, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from '../Modal/Modal';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import BankPopup from '../BankPage/BankPopup';
import Notification from './Notification/Notification';
import UserInfo from '../views/UserPage/UserInfo/UserInfo';
import {logout, setNotification} from '../../actions/user_actions';
import './NavBar.css';

const NavBar = () => {
    const dispatch = useDispatch();
    const modal = useRef(null);
    const [userMode, setUserMode] = useState('');
    const [userName, setUserName] = useState('');
    const history = useHistory();
    const [isCreditPageOpen, setIsCreditPageOpen] = useState(false);
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
    const currentUserInfo = useSelector ((state) => state.user_reducer.loggedInUser);
    const currentNotif = useSelector((state) => state.user_reducer.notif);
    const isLoading = useSelector((state) => state.user_reducer.isLoading);
    
    useEffect(() => {
        if (currentUserInfo) {
            if(currentUserInfo.isUser) {
                setUserMode('user');
            } else {
                setUserMode('admin');    
            }
            setUserName(currentUserInfo.userName);
        }
        return () => {
            setUserMode('');
            modal.current.close();
        }
    },[currentUserInfo]);

       
    return(
        <header>
            <h1 className={ isLoading ? "corner_box_animation" : null}>Active <br></br>Learning<br></br>Center</h1>
            <nav>
                {
                    userMode === "admin" || userMode === "user" 
                    ? null 
                    : <a className="home_nav" onClick={() => {
                        modal.current.close();
                        history.push('/');
                    }}>
                        Home
                        </a>
                }
               {
                   userMode != "user" 
                   ? null 
                   : <a className="bank_nav" onClick={() => {
                           setIsCreditPageOpen(true);
                           setIsRegisterPopupOpen(false);
                           setIsLoginPopupOpen(false);
                           modal.current.open();
                   }}>
                       Bank
                       </a>
               }
               
                {
                    userMode === "user" 
                    ? <>
                        <a className="user_nav neon">{userName}</a>
                    </>
                    : null
                }
                {
                    userMode === "admin" 
                    ? <>
                        <a className="user_nav neon">{userName}</a>
                    </>
                    : null
                }
                {
                    userMode != "admin" && userMode != "user"
                    ? <a className="register_nav" onClick={() => {
                        setIsRegisterPopupOpen(true);
                        setIsLoginPopupOpen(false);
                        setIsCreditPageOpen(false);
                        modal.current.open();
                    }}>
                        Register
                        </a>
                    : null 
                }
                {
                    userMode === "admin" || userMode === "user" 
                    ? <a className="logout_nav" onClick={() => {
                        
                        dispatch(logout(currentUserInfo))
                        .then(() => {
                            dispatch(setNotification("Logout successfully"));
                            history.push('/');
                        });
                        modal.current.close();
                        }}>
                            Logout
                        </a> 
                    : <a className="login_nav" onClick={() => {
                        setIsLoginPopupOpen(true);
                        setIsRegisterPopupOpen(false);
                        setIsCreditPageOpen(false);
                        modal.current.open();
                    }}>
                        Login
                        </a> 
                }
            </nav>
            <Modal ref={modal}>
                { isLoginPopupOpen ? (<LoginPopup close={() => modal.current.close()}/>) : null}
                { isCreditPageOpen ? (<BankPopup close={() => modal.current.close()}/>) : null}
                { isRegisterPopupOpen ? (<RegisterPopup close={() => modal.current.close()}/>) : null}
            </Modal>
            {currentNotif ? <Notification message={currentNotif}/> : null}
            { userMode ? <UserInfo user={currentUserInfo}/> : null}
        </header>
    );
}
export default NavBar;