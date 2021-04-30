import {React, useRef, useState} from 'react';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import LoadingContainer from '../../utils/LoadingContainer/LoadingContainer';
import {
  getRoomUser
} from '../../actions/room_actions';
import './ClassRoom.css';

const ClassRoom = (props) => {
    const dispatch = useDispatch();
    const roomInputRef = 
      {
        chatMessage: useRef(null),
        selectedChoice: useRef(null),
        textAnswer: useRef(null),
        emoji: useRef(null),
      };

    const [isEditing, setIsEditing] = useState(false);
    const [currentImg, setCurrentImg] = useState(null);
    const currentLoginUser = useSelector((state) => state.user_reducer.loggedInUser);
    
    return (
      <div className="room_container shadow">
          This is room container
          {/* camera component */}
      </div>
    );
};
export default ClassRoom;