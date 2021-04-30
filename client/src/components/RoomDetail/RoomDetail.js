import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './RoomDetail.css';

const RoomDetail = () => {
    const {id} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const modalRef = useRef();
    const dateRef = useRef(null);
    const roomList = useSelector((state) => state.user_reducer.roomList);
    const currentUser = useSelector((state) => state.user_reducer.loggedInUser);
    const [room, setRoom] = useState(null);
    const roomInputRef = 
      {
        chatMessage: useRef(null),
        selectedChoice: useRef(null),
        textAnswer: useRef(null),
        emoji: useRef(null),
      };

    useEffect(() => {
        scrollToModal();
        if (roomList === undefined || roomList === null) {
            history.push('/room');
        } else {
            setRoom(roomList.find((room) => room.id === id));
        }
    },[roomList]);


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

    return(
        <div className="detail_page">
            <div ref={modalRef} className="scroll_position_holder"></div>
            <div className="house_message shadow">
                {room?.title}            
            </div>
            <div className="house_detail">
                <div className="detail_image shadow">
                    <img className="image" alt="Loading..." src={room?.imgUrl}/>
                </div>
                <div className="detail_info">
                    <div style={{color: "yellow"}}>Participants:&nbsp; {room?.roomParticipants}</div>
                    <div style={{color: "yellow"}}>Participants:&nbsp; {room?.isFull}</div>
                    <div> Course: &nbsp; 
                        {room?.course}
                    </div>
                    <div> Coacher: &nbsp; 
                        {room?.coacher}
                    </div>
                    <div> Price: &nbsp;
                        { room?.price + " Tỷ VND"}
                    </div>
                    <div> Start:&nbsp;
                        { room?.start}
                    </div>
                    <div> End:&nbsp;
                        { room?.end}
                    </div>
                    
                    <form className="add_schedule" onSubmit={(e) => onSubmitSchedule(e)}>
                        <div>Chọn lịch hẹn</div>
                        <input ref={dateRef} type="date" required></input>
                        <input type="submit" value="Đặt lịch hẹn"></input>
                    </form>
                </div>
            </div>
            <div className="map_container">
                <div className="house_message shadow">
                    Vị trí trên Google Map
                </div>
                
            </div>
        </div>
    );
}
export default RoomDetail;