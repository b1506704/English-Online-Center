import {React, useRef, useState} from 'react';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';
import {
  registerRoom, 
  filterRoom, 
  deleteRoom, 
  deleteBank, 
  deleteCourse, 
  setNotification,
  updateRoom,
  updateCourse,
  updateBank,
  getUser
} from '../../../actions/user_actions';
import './Card.css';
import BIDV from '../../../assets/imgs/bidv.jpg'; 
import Agribank from '../../../assets/imgs/agribank.png'
import Sacombank from '../../../assets/imgs/sacombank.jpeg'
import Vietcombank  from '../../../assets/imgs/vietcombank.png';

const Card = ({room, course, bank, type, mode}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const roomInputRef = 
      {
        courseRef: useRef(null),
        priceRef: useRef(null),
        start: useRef(null),
        end: useRef(null),
      };
    const courseInputRef = 
    {
      nameRef: useRef(null),
    };
    const bankInputRef = 
    {
      providerRef: useRef(null),
      ownerRef: useRef(null),
      valueRef: useRef(null),
    };
    
    const [isEditing, setIsEditing] = useState(false);
    const [currentImg, setCurrentImg] = useState(null);
    const currentLoginUser = useSelector((state) => state.user_reducer.loggedInUser);
    const currentCourse = useSelector((state) => state.user_reducer.courseList);
    const currentRoom = useSelector((state) => state.user_reducer.roomList);
    const providerList = ["Agribank","BIDV","Sacombank","Vietcombank"];   
    const bankValueList = [200000, 500000, 1000000, 2000000, 1000000];   
    
    const countCtgByName = (name) => {
      if (currentRoom) {
        let count = 0;
        for (let i = 0; i < currentRoom.length; i++) {
          if (currentRoom[i].course === name) {
            count++;
          }
        }
        return count;
      }
    }

    const countCtgBySell = (name) => {
      let count = 0;
      if (currentRoom) {
        for (let i = 0; i < currentRoom.length; i++) {
          if (currentRoom[i].course === name && currentRoom[i].isFull === true) {
            count++;
          }
        }
        return count;
      }
    }

    const onCardSelect = () => {
      if (type === "course") {
        dispatch(filterRoom(course.name));
      }
      if (type === "room") {
        if (currentLoginUser === null || currentLoginUser === undefined) {
          dispatch(setNotification("Please login first!"));
        } else {
          // route user
          history.push(`/user/room/${room.id}`);
          // dispatch(registerRoom(currentLoginUser.userName, room))
          // .then(() => dispatch(getUser(currentLoginUser.userName)));
        } 
      }
    }
    const onCardEdit = () => {
      setIsEditing(true);
    }
    const onCardUpdate = () => {
      if (type === "room") {
        const updatedRoom = {
          price: roomInputRef.priceRef.current.value || null,
          course: roomInputRef.courseRef.current.value || null,
          imgUrl:  currentImg ? currentImg : null,
          start: roomInputRef.start.current.value || null,
          end: roomInputRef.end.current.value || null,
        };
          dispatch(updateRoom(room.id, updatedRoom))
          .then(() => setIsEditing(false));
      } else if (type === "course") {
          const updatedCourse = {
            name: courseInputRef.nameRef.current.value || course.name,
            imgUrl: currentImg ? currentImg : course.imgUrl,
          };
          dispatch(updateCourse(course.name, updatedCourse))
          .then(() => setIsEditing(false));
      } else if (type === "bank") {
          const updatedBank = {
            provider: bankInputRef.providerRef.current.value,
            value: bankInputRef.valueRef.current.value,
          };
          dispatch(updateBank(bank.id, updatedBank))
          .then(() => setIsEditing(false));
      }
    }
    const onCardCancel = () => {
      setIsEditing(false);
    }
    const onCardDelete = () => {
      if (type === "room") {
        dispatch(deleteRoom(room.id));
      } else if (type === "bank") {
        dispatch(deleteBank(bank.id));
      } else if (type === "course") {
        dispatch(deleteCourse(course.name));
      }
    }
    
    return (
      <div className="card_detail shadow">
        <div className="title_bar shadow">
          { type === "room" ? '#' + room.id : type === "course" ? '#' + course.name : type ==="bank" ? '#' + bank.id : null }            
        </div>
        { 
          type === "room" 
          ? <div className="room_info">
              <div> Course: &nbsp; 
                { isEditing === false ? room.course
                  : (<select ref={roomInputRef.courseRef}>
                      { currentCourse != null 
                        ? currentCourse.map((ele, key) => (<option value={ele.name} key={key}>{ele.name}</option>))
                        : null
                      }
                    </select>)
                }
              </div>
              <div> Price: &nbsp;
                { isEditing === false ? room.price + " VND"
                  : (<input ref={roomInputRef.priceRef} type="text" placeholder={room.price}></input>)
                }
              </div>
              <div style={{color: "red"}}>Status &nbsp;{room.isFull ? "Full" : "Ready"}</div>
              <div style={{color: "red"}}>Participants:&nbsp; {room.roomParticipants}</div>
              <div style={{color: "red"}}>Coacher:&nbsp; {room.roomCoacher}</div>
              <div>Start:&nbsp;
              { isEditing === false ? room.start
                : (<input ref={roomInputRef.start} type="text" placeholder={room.start}></input>)
              }
              </div>
              <div>End:&nbsp;
              { isEditing === false ? room.end
                : (<input ref={roomInputRef.end} type="text" placeholder={room.end}></input>)
              }
              </div>
            </div>
          : type === "course" 
            ? <div className="room_info">
                <div> Course Name:
                  { isEditing === false ? course.name
                  : (<input ref={courseInputRef.nameRef} type="text" placeholder={course.name}></input>)
                  }
                </div>
                <div style={{color: "red"}}> Total Linked Room:&nbsp; {countCtgByName(course.name) || null}</div>
                <div style={{color: "red"}}> Crowded Room: &nbsp; {countCtgBySell(course.name) || null}</div>
              </div>
              : type === "bank"
                ? <div className="room_info">
                    <div> Bank:&nbsp;
                        { isEditing === false ? bank.provider
                          : (<select ref={bankInputRef.providerRef}>
                              { providerList != null 
                                ? providerList.map((ele, key) => (<option value={ele} key={key}>{ele}</option>))
                                : null
                              }
                            </select>)
                        }
                    </div>
                    <div> Balance: &nbsp;
                        { isEditing === false ? bank.value + " Billion VND"
                          : (<select ref={bankInputRef.valueRef}>
                              { bankValueList != null 
                                ? bankValueList.map((ele, key) => (<option value={ele} key={key}>{ele}</option>))
                                : null
                              }
                            </select>)
                        }
                    </div>
                    <div> Owner: &nbsp;
                        { isEditing === false ? bank.owner
                          : null
                        }
                    </div>
                    <div style={{color: "red"}}> Status: &nbsp;  {bank.isOwned ? "Linked" : "Unlinked" }</div>
                  </div>
                  : null   
        }
        {
          mode === "view"
          ? <>
              {
                type === "room" ? <button type="button" className="card_button buy_button shadow" onClick={onCardSelect}></button>   
                : type === "course" ? <button type="button" className="card_button browse_button shadow" onClick={onCardSelect}></button>
                : null   
              } 
            </>
          : <>
              { isEditing === false 
                ? (<button type="button" className="card_button edit_button shadow" onClick={onCardEdit}>
                    
                  </button>) 
                : <>
                  { type === "bank" ? null : (<div className="card_button base64_button shadow">
                    Image Upload:
                    <FileBase className="base64"  type="file" multiple={false} onDone = {({base64}) => {setCurrentImg(base64)}}></FileBase>  
                  </div>)}
                  <button type="button" className="card_button cancel_button shadow" onClick={onCardCancel}>
                    
                  </button>
                  <button type="button" className="card_button save_button shadow" onClick={onCardUpdate}>
                    
                  </button>
                  </>
              }
              <button type="button" className="card_button delete_button shadow" onClick={onCardDelete}>
                  (X)         
              </button>
            </>
        }
        <div className="image_container">
          { type === "room" && (room.imgUrl || currentImg) ? 
            (<img className="image" alt="Loading..." src={currentImg || room.imgUrl}/>)
            : type === "course" && (course.imgUrl || currentImg ) ?
            (<img className="image" 
              alt="Loading..." 
              src={
                currentImg || course.imgUrl
            }/>)   
          : type === "bank" ?
            (<img className="image" 
              alt="Loading..." 
              src={
                bank.provider === "BIDV" 
              ? BIDV
              : bank.provider === "Agribank"
              ? Agribank
              : bank.provider === "Sacombank"
              ? Sacombank
              : bank.provider === "Vietcombank"
              ? Vietcombank
              : null
            }/>)  
          : (<LoadingContainer style="spinner"/>)
          }
        </div>
      </div>
    );
};
export default Card;