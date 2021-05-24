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
  updateUser,
  deleteTest,
  deleteLesson,
  openPaypal
} from '../../../actions/user_actions';
import './Card.css';
import Test from '../../../assets/imgs/test.jpg';
import Practice from '../../../assets/imgs/practice.jpg';
import Vocabulary from '../../../assets/imgs/vocabulary.jpg';
import Grammar from '../../../assets/imgs/grammar.jpg';
import Listening from '../../../assets/imgs/listening.jpg';
import Reading from '../../../assets/imgs/reading.jpg';

const Card = ({room, course, user, bank, lesson, test, type, mode}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const roomInputRef = 
      {
        courseRef: useRef(null),
        priceRef: useRef(null),
        start: useRef(null),
        end: useRef(null),
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
          if (room.roomParticipants.some((e) => e === currentLoginUser.userName)) {
            history.push(`/user/room/${room.id}`);
          } else {
            dispatch(setNotification("Please pay first!"));
            dispatch(openPaypal(true,room));
          }
        } 
      }
      if (type === "test") {
        history.push(`/user/test/${test.id}`);
      }
    }
    
    const onCardEdit = () => {
      if (type === "test") {
        history.push(`/coacher/test/${test.id}`);
      } else if (type === "course") {
        history.push(`/coacher/course/${course.id}`);
      } else if (type === "lesson") {
        history.push(`/coacher/lesson/${lesson.id}`);
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
        dispatch(deleteCourse(course.id));
      } else if (type === "user") {
        dispatch(deleteUser(user.userName));
      } else if (type === "test") {
        dispatch(deleteTest(test.id));
      } else if (type === "lesson") {
        dispatch(deleteLesson(lesson.id));
      } 
    }


    if (type === "user") {
      return (
        <div className="card_detail shadow">
          <div className="title_bar shadow">
            <span>{user.userName}</span>
          </div>
          <div className="room_info">
            <div> Username: &nbsp;
                      { isEditing === false ? <span>{user.userName}</span>
                        : (<input ref={userInputRef.userName} type="text" defaultValue={user.userName}></input>)
                      }
              </div>
            <div> Password: &nbsp;
                    { isEditing === false ? <span>{user.passWord}</span>
                      : (<input ref={userInputRef.passWord} type="text" defaultValue={user.passWord}></input>)
                    }
            </div>
            <div> Full Name: &nbsp;
                    { isEditing === false ? <span>{user.fullName}</span>
                      : (<input ref={userInputRef.fullName} type="text" defaultValue={user.fullName}></input>)
                    }
            </div>
            <div> Gender: &nbsp;
                    { isEditing === false ? <span>{user.gender}</span>
                      : (<input ref={userInputRef.gender} type="text" defaultValue={user.gender}></input>)
                    }
            </div>
            <div> Email: &nbsp;
                    { isEditing === false ? <span>{user.email}</span>
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
            { type === "room" ? room.id : type === "course" ? course.name : null }            
          </div>
          { 
            type === "room" 
            ? <div className="room_info">
                <div> Course: &nbsp; 
                  { isEditing === false ? <span>{currentCourse.find((e) => e.id === room.course)?.name}</span>
                    : (<select ref={roomInputRef.courseRef}>
                        { currentCourse != null 
                          ? currentCourse.map((ele, key) => (<option value={ele.id} key={key}>{ele.name}</option>))
                          : null
                        }
                      </select>)
                  }
                </div>
                <div> Price: &nbsp;
                  { isEditing === false ? <span>{room.price + " USD"}</span>
                    : (<input ref={roomInputRef.priceRef} type="text" defaultValue={room.price}></input>)
                  }
                </div>
                <div style={{color: "blue"}}>Status: &nbsp; <span>{room.isFull ? "Full" : "Ready"}</span></div>
                <div>Coacher:&nbsp; <span>{room.roomCoacher}</span></div>
                <div>Participants:&nbsp; <span>{room.roomParticipants.length}</span></div>
                <div>Start:&nbsp;
                { isEditing === false ? <span>{room.start}</span>
                  : (<input ref={roomInputRef.start} type="text" defaultValue={room.start}></input>)
                }
                </div>
                <div>End:&nbsp;
                { isEditing === false ? <span>{room.end}</span>
                  : (<input ref={roomInputRef.end} type="text" defaultValue={room.end}></input>)
                }
                </div>
              </div>
            : type === "course" 
              ? <div className="room_info">
                  <div> Course Name:
                    <span>{course.name}</span>
                  </div>
                  <div> Duration:
                    <span>{course.duration ? course.duration + ' weeks': 'Not set'}</span>
                  </div>
                </div>
            : type === "test" 
            ? <div className="room_info">
                <div> Test Name:
                  <span>{test.name}</span>
                </div>
                <div> Total Questions:
                  <span>{test.questions.length}</span>
                </div>
                <div> Type:
                  <span>{test.isPractice ? "Practice" : "Test"}</span>
                </div>
              </div>
            : type === "lesson" 
            ? <div className="room_info">
                <div> Lesson Name:
                <span>{lesson.name}</span>
                </div>
                <div> Minutes To Read: 
                <span>{lesson.duration}</span>
                </div>
                <div> Type:
                <span>{lesson.isGrammar ? "Grammar" : lesson.isVocabulary ? "Vocabulary" : lesson.isReading ? "Reading" : lesson.isListening ? "Listening" : null}</span>
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
                  : type === "test" ? <button type="button" className="card_button browse_button shadow" onClick={onCardSelect}>Take</button>
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
                  course.imgUrl
              }/>)
              : type === "lesson" ?
              (<img className="image"
                alt="Loading..."
                src={lesson.isGrammar ? Grammar : lesson.isVocabulary ? Vocabulary : lesson.isReading ? Reading : lesson.isListening ? Listening : null}
              />)
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