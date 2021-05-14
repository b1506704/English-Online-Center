import {React, useRef, useState} from 'react';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';
import {
  registerRoom, 
  filterRoom, 
  deleteRoom,
  deleteUser, 
  deleteCourse, 
  setNotification,
  updateRoom,
  updateCourse,
  updateUser,
  deleteTest,
} from '../../../actions/user_actions';
import './Card.css';
import Test from '../../../assets/imgs/test.jpg';
import Practice from '../../../assets/imgs/practice.jpg';

const Card = ({room, course, user, bank, test, type, mode}) => {
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
    
    const userInputRef = 
      {
        userName: useRef(null),
        passWord: useRef(null),
        gender: useRef(null),
        fullName: useRef(null),
        email: useRef(null),
      };
    
    const [isEditing, setIsEditing] = useState(false);
    const [currentImg, setCurrentImg] = useState(null);
    const currentLoginUser = useSelector((state) => state.user_reducer.loggedInUser);
    const currentCourse = useSelector((state) => state.user_reducer.courseList);
    const currentRoom = useSelector((state) => state.user_reducer.roomList);
    
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
        dispatch(filterRoom(course.name))
        .then(() => history.push("/user/room"));
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
      if (type === "test") {
        history.push(`/coacher/test/${test.id}`);
      } else {
        setIsEditing(true);
      }
    }
    const onCardUpdate = () => {
      if (type === "room") {
        const updatedRoom = {
          price: roomInputRef.priceRef.current.value || room.price,
          course: roomInputRef.courseRef.current.value || room.course,
          imgUrl:  currentImg ? currentImg : room.imgUrl,
          start: roomInputRef.start.current.value || room.start,
          end: roomInputRef.end.current.value || room.end,
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
      } else if (type === "user") {
        const updatedUser = {
          userName:  userInputRef.userName.current.value || user.userName,
          passWord:  userInputRef.passWord.current.value || user.passWord,
          imgUrl:  currentImg ? currentImg : user.imgUrl,
          gender:  userInputRef.gender.current.value || user.gender,
          fullName:  userInputRef.fullName.current.value || user.fullName,
          email:  userInputRef.email.current.value || user.email,
        };
        dispatch(updateUser(user.userName, updatedUser))
        .then(() => setIsEditing(false));
    }
    }
    const onCardCancel = () => {
      setIsEditing(false);
    }
    const onCardDelete = () => {
      if (type === "room") {
        dispatch(deleteRoom(room.id));
      } else if (type === "course") {
        dispatch(deleteCourse(course.name));
      } else if (type === "user") {
        dispatch(deleteUser(user.userName));
      } else if (type === "test") {
        dispatch(deleteTest(test.id));
      } 
    }


    if (type === "user") {
      return (
        <div className="card_detail shadow">
          <div className="title_bar shadow">
            {user.userName}
          </div>
          <div className="room_info">
            <div> Username: &nbsp;
                      { isEditing === false ? user.userName
                        : (<input ref={userInputRef.userName} type="text" defaultValue={user.userName}></input>)
                      }
              </div>
            <div> Password: &nbsp;
                    { isEditing === false ? user.passWord
                      : (<input ref={userInputRef.passWord} type="text" defaultValue={user.passWord}></input>)
                    }
            </div>
            <div> Full Name: &nbsp;
                    { isEditing === false ? user.fullName
                      : (<input ref={userInputRef.fullName} type="text" defaultValue={user.fullName}></input>)
                    }
            </div>
            <div> Gender: &nbsp;
                    { isEditing === false ? user.gender
                      : (<input ref={userInputRef.gender} type="text" defaultValue={user.gender}></input>)
                    }
            </div>
            <div> Email: &nbsp;
                    { isEditing === false ? user.email
                      : (<input ref={userInputRef.email} type="text" defaultValue={user.email}></input>)
                    }
            </div>
          </div>
          <div className="image_container">
            { user.imgUrl || currentImg ? 
              <img className="image" src={currentImg || user.imgUrl}/>
             : <LoadingContainer/>
            }
          </div>
          <>
                { isEditing === false 
                  ? (<button type="button" className="card_button edit_button shadow" onClick={onCardEdit}>
                      Edit
                    </button>) 
                  : <>
                    
                    <button type="button" className="card_button cancel_button shadow" onClick={onCardCancel}>
                      Cancel
                    </button>
                    <button type="button" className="card_button base64_button">
                      Image Upload:
                      <FileBase className="base64"  type="file" multiple={false} onDone = {({base64}) => {setCurrentImg(base64)}}></FileBase>  
                    </button>
                    <button type="button" className="card_button save_button shadow" onClick={onCardUpdate}>
                      Save  
                    </button>
                    </>
                }
                <button type="button" className="card_button delete_button shadow" onClick={onCardDelete}>
                  Delete   
                </button>
          </> 
        </div>
      );

    } else {

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
                    : (<input ref={roomInputRef.priceRef} type="text" defaultValue={room.price}></input>)
                  }
                </div>
                <div style={{color: "blue"}}>Status: &nbsp;{room.isFull ? "Full" : "Ready"}</div>
                <div>Coacher:&nbsp; {room.roomCoacher}</div>
                <div>Participants:&nbsp; {room.roomParticipants.length}</div>
                <div>Start:&nbsp;
                { isEditing === false ? room.start
                  : (<input ref={roomInputRef.start} type="text" defaultValue={room.start}></input>)
                }
                </div>
                <div>End:&nbsp;
                { isEditing === false ? room.end
                  : (<input ref={roomInputRef.end} type="text" defaultValue={room.end}></input>)
                }
                </div>
              </div>
            : type === "course" 
              ? <div className="room_info">
                  <div> Course Name:
                    { isEditing === false ? course.name
                    : (<input ref={courseInputRef.nameRef} type="text" defaultValue={course.name}></input>)
                    }
                  </div>
                  <div style={{color: "blue"}}> Total Linked Room:&nbsp; {countCtgByName(course.name) || null}</div>
                  <div style={{color: "blue"}}> Crowded Room: &nbsp; {countCtgBySell(course.name) || null}</div>
                </div>
            : type === "test" 
            ? <div className="room_info">
                <div> Test Name:
                  {test.name}
                </div>
                <div> Total Questions:
                  {test.questions.length}
                </div>
                <div> Type:
                  {test.isPractice ? "Practice" : "Test"}
                </div>
              </div>
            : null   
          }
          {
            mode === "view"
            ? <>
                {
                  type === "room" ? <button type="button" className="card_button buy_button shadow" onClick={onCardSelect}>Join</button>   
                  : type === "course" ? <button type="button" className="card_button browse_button shadow" onClick={onCardSelect}>Filter</button>
                  : null   
                } 
              </>
            : <>
                { isEditing === false 
                  ? (<button type="button" className="card_button edit_button shadow" onClick={onCardEdit}>
                      Edit    
                    </button>) 
                  : <>
                    <button type="button" className="card_button base64_button">
                      Image Upload:
                      <FileBase className="base64"  type="file" multiple={false} onDone = {({base64}) => {setCurrentImg(base64)}}></FileBase>  
                    </button>
                    <button type="button" className="card_button cancel_button shadow" onClick={onCardCancel}>
                      Cancel  
                    </button>
                    <button type="button" className="card_button save_button shadow" onClick={onCardUpdate}>
                      Save
                    </button>
                    </>
                }
                <button type="button" className="card_button delete_button shadow" onClick={onCardDelete}>
                    Delete         
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
              : type === "test" ?
              (<img className="image" 
                alt="Loading..." 
                src={ test.isPractice ? Practice : Test }/>)    
            : (<LoadingContainer style="spinner"/>)
            }
          </div>
        </div>
      );
    }
};
export default Card;