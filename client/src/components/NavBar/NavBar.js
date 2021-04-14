import { React, useRef, useState } from 'react';
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

const NavBar = ({userMode, userName}) => {
    const dispatch = useDispatch();
    const modal = useRef(null);
    const history = useHistory();
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [isCreditPageOpen, setIsCreditPageOpen] = useState(false);
    const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
    const currentUserInfo = useSelector ((state) => state.user_reducer.login);
    const currentNotif = useSelector((state) => state.user_reducer.notif);
    return(
        <header>
            <h1>English <br></br>Online<br></br>Center</h1>
            <nav>
                {
                    userMode === "admin" || userMode === "user" 
                    ? null 
                    : <a className="home_nav" onClick={() => {
                        modal.current.close();
                    }}>
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
                        </a>
                }
                {
                    userMode === "user" 
                    ? <>
                        <span className="neon"> | {userName} |</span>
                        <a className="user_nav neon"></a>

                    </>
                    : null
                }
                {
                    userMode === "admin" 
                    ? <>
                        <span className="neon"> | {userName} |</span>
                        <a className="user_nav neon"></a>

                    </>
                    : null
                }
                {
                    userMode != "admin" && userMode != "user"
                    ? <a className="register_nav" onClick={() => {
                        setIsRegisterPopupOpen(true);
                        setIsCreditPageOpen(false);
                        setIsLoginPopupOpen(false);
                        modal.current.open();
                    }}>
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
                        </a> 
                    : <a className="login_nav" onClick={() => {
                        setIsLoginPopupOpen(true);
                        setIsCreditPageOpen(false);
                        setIsRegisterPopupOpen(false);
                        modal.current.open();
                    }}>
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