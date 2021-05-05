import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { setNotification } from '../../../actions/user_actions';

import './Notification.css';

const Notification = ({message}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(setNotification(null));
        }, 1500);
    },[message]);

    return(
        <div className="notification_container shadow">
            <h2> {message} </h2>
        </div>
    );
}
export default Notification;