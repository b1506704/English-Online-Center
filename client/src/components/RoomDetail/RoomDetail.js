import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './RoomDetail.css';
import { joinRoom } from '../../actions/user_actions';

const RoomDetail = () => {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const modalRef = useRef();
    const roomList = useSelector((state) => state.user_reducer.roomList);
    const currentUser = useSelector((state) => state.user_reducer.loggedInUser);
    // const currentRoom = useSelector((state) => state.user_reducer.currentRoom);
    const userList = useSelector((state) => state.user_reducer.userList);
    const [room, setRoom] = useState(null);

    useEffect(() => {
        if (roomList === undefined || roomList === null) {
            history.push('/room');
        } else {
            setRoom(roomList.find((room) => room.id === id));
        }
    },[roomList]);

    useEffect(() => {
        scrollToModal();
    },[]);

    const onSubmitSchedule = (e) => {
        e.preventDefault();
        
    }
    const scrollToModal = () => {
        modalRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start", 
          inline: "nearest"
        });
      };
    
    const renderParticipants = () => {
        const participants = room?.roomParticipants
                            .map((user, key) => 
                            (<a 
                                className="participant shadow" key={key} 
                                onClick={() => history.push(`/user/${user}`)}>
                                {user}
                            </a>));
        return participants;
    }
    
    const onJoin = () => {
        dispatch(joinRoom(id, currentUser));
    }

    return(
        <div className="detail_page">
            <div ref={modalRef} className="scroll_position_holder"></div>
            <h2 className="room_message neon shadow">
                {"Room " + room?.id}            
            </h2>
            <div className="room_detail">
                <div className="detail_media shadow">
                    <h2>Media Preview</h2>
                    <img className="image" alt="Loading..." src={room?.imgUrl}/>
                </div>
                <div className="detail_info shadow">
                    <h2>Information</h2>
                    <div style={{color: "yellow"}}>Participants:&nbsp; <span>{room?.roomParticipants.length ? room.roomParticipants.length : "0"}</span></div>
                    <div style={{color: "yellow"}}>Ownership:&nbsp; <span>{room?.roomParticipants.find((e) => e?.userName === currentUser?.userName) ? "Yes" : "No"}</span></div>
                    <div style={{color: "yellow"}}>Status:&nbsp; <span>{room?.isFull ? "Full" : "Available"}</span></div>
                    <div> Course: &nbsp; 
                        <span>{room?.course}</span>
                    </div>
                    <div> Coacher: &nbsp; 
                        <span>{room?.roomCoacher}</span>
                    </div>
                    <div> Price: &nbsp;
                        <span>{ room?.price + " VND"}</span>
                    </div>
                    <div> Start:&nbsp;
                        <span>{ room?.start ? room.start : "Not set"}</span>
                    </div>
                    <div> End:&nbsp;
                        <span>{ room?.end ? room.end : "Not set"}</span>
                    </div>
                    
                    <form className="members" onSubmit={(e) => onSubmitSchedule(e)}>
                        <h2>Members</h2>
                        <div className="participants">
                            {renderParticipants()}
                        </div>
                        <input type="submit" className="shadow neon" value="Join" onClick={onJoin}></input>
                        <input type="submit" className="shadow neon" value="Invite"></input>
                    </form>
                </div>
            </div>
            <h2 className="room_message shadow">
                Course Content
            </h2>
            <div className="content_container">

            </div>
        </div>
    );
}
export default RoomDetail;