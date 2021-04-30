import {React, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';
import {
  getRoomUser
} from '../../actions/room_actions';
import './Camera.css';

const Camera = (props) => {
    const dispatch = useDispatch();
    const [isActivate, setIsActivate] = useState(false);
    const camera = useRef(null);
    
    return (
      <div className="camera_container">
        {isActivate && <LoadingContainer/>}      
      </div>
    );
};
export default Camera;