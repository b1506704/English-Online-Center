import { React, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../Modal/Modal';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import BankPage from '../BankPage/BankPage';
import Notification from './Notification/Notification';
import UserInfo from '../UserPage/UserInfo/UserInfo';
import {logout, setNotification} from '../../actions/user_actions';
import './NavBar.css';

const NavBar = ({userMode, userName}) => {
    const dispatch = useDispatch();
    const modal = useRef(null);
    const [isLoginPageOpen, setIsLoginPageOpen] = useState(false);
    const [isCreditPageOpen, setIsCreditPageOpen] = useState(false);
    const [isRegisterPageOpen, setIsRegisterPageOpen] = useState(false);
    const currentUserInfo = useSelector ((state) => state.user_reducer.login);
    const currentNotif = useSelector((state) => state.user_reducer.notif);
    return(
        <header>
            <h1>Real <br></br>Estate<br></br> Service</h1>
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
                        setIsRegisterPageOpen(false);
                        setIsLoginPageOpen(false);
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
                        setIsRegisterPageOpen(true);
                        setIsCreditPageOpen(false);
                        setIsLoginPageOpen(false);
                        modal.current.open();
                    }}>
                        </a>
                    : null 
                }
                {
                    userMode === "admin" || userMode === "user" 
                    ? <a className="logout_nav" onClick={() => {
                        
                        dispatch(logout(currentUserInfo))
                        .then(() => dispatch(setNotification("Đăng xuất thành công")));
                        modal.current.close();
                        }}>
                        </a> 
                    : <a className="login_nav" onClick={() => {
                        setIsLoginPageOpen(true);
                        setIsCreditPageOpen(false);
                        setIsRegisterPageOpen(false);
                        modal.current.open();
                    }}>
                        </a> 
                }
            </nav>
            <Modal ref={modal}>
                { isLoginPageOpen ? (<LoginPage close={() => modal.current.close()}/>) : null}
                { isCreditPageOpen ? (<BankPage close={() => modal.current.close()}/>) : null}
                { isRegisterPageOpen ? (<RegisterPage close={() => modal.current.close()}/>) : null}
            </Modal>
            {currentNotif ? <Notification message={currentNotif}/> : null}
            { userMode ? <UserInfo user={currentUserInfo}/> : null}
        </header>
    );
}
export default NavBar;