import { React, useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Carousel} from 'react-responsive-carousel';

import Card from './Card/Card';
import LoadingContainer from '../../utils/LoadingContainer/LoadingContainer';
import 
{
    createRoom, 
    createCourse, 
    createTest,
    createLesson, 
    fetchCourse, 
    fetchRoom, 
    fetchUser, 
    fetchTest,
    fetchLesson, 
    setNotification, 
    register, 
    setIsLoading, 
    filterRoomById  
} 
    from '../../actions/user_actions';
import random from '../../utils/RandomNumber';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './CardList.css';

const CardList = ({context}) => {
    const dispatch = useDispatch();
    const roomList = useSelector((state) => state.user_reducer.roomList);
    const courseList = useSelector((state) => state.user_reducer.courseList);
    const userList = useSelector((state) => state.user_reducer.userList);
    const testList = useSelector((state) => state.user_reducer.testList);
    const lessonList = useSelector((state) => state.user_reducer.lessonList);
    const currentUser = useSelector((state) => state.user_reducer.currentUser);
    const searchInput = useRef(null);

    const [currentItem, setCurrentItem] = useState(0);

    const addRoom = () => {
        dispatch(
            createRoom(
                {
                    id: random(1,2000),  
                    price: 0,
                    course: courseList !=null && courseList.length!= 0 ? courseList[random(0,  courseList.length - 1)].name : null,
                    imgUrl: null,
                    isFull: false, 
                    roomCoacher: currentUser.userName,
                    start: '',
                    end: '',
                }
            )
        );
    }
    
    const addCourse = () => {
        dispatch(createCourse(
            {
                id: random(1,20000),
                name: 'Blank Course',
                testList: [],
                lessonList: [],
                imgUrl: null,
                registerNumer: 0
            }));
    }

    const addUser = () => {
        dispatch(register(
            {
                userName: random(1,20000),
                passWord: '123456',
                gender: 'Male',
                fullName: 'Test', 
                birthDate: '01-01-2020',
                phoneNumber: '038XXXXXX',
                address: 'test',
                email: random(1,20000) + '@gmail.com'
            }
        ));
    }

    const addTest = () => {
        dispatch(createTest(
            {
                id: random(1,20000),
                name: '... Test',
                description: 'The most standard exam for testing language proficiency',
                questions: [{
                    id: random(1,20000)
                }]
            }
        ));
    }

    const addLesson = () => {
        dispatch(createLesson(
            {
                id: random(1,20000),
                name: 'Blank Lesson',
                description: 'Lesson about ...',
                content: [{
                    front: {
                        text: 'Unrevealed word',
                        image: ''
                    },
                    back: {
                        text: 'Revealed word'
                    },
                }],
                isVocabulary: true,
                isGrammar: false,
                isReading: false,
                isListening: false,
                duration: 5
            }
        ));
    }

    const loadTest = () => {
        dispatch(setIsLoading(true));
        dispatch(fetchTest())
        .then(() => dispatch(setNotification("Sucessfully Updated")))
        .then(() => dispatch(setIsLoading(false)));
    }

    const loadLesson = () => {
        dispatch(setIsLoading(true));
        dispatch(fetchLesson())
        .then(() => dispatch(setNotification("Sucessfully Updated")))
        .then(() => dispatch(setIsLoading(false)));
    }

    const loadUser = () => {
        dispatch(setIsLoading(true));
        dispatch(fetchUser())
        .then(() => dispatch(setNotification("Sucessfully Updated")))
        .then(() => dispatch(setIsLoading(false)));
    }

    const loadCourse = () => {
        dispatch(fetchCourse())
        .then(() => dispatch(setNotification("Successfully Updated")));
    }

    const loadRoom = () => {
        dispatch(fetchRoom())
        .then(() => dispatch(setNotification("Successfully Updated")));
    }
    
    const searchByID = (e) => {
        e.preventDefault();
        const id = searchInput.current.value;
        if (id.trim() === '') {
            dispatch(setNotification("Please enter id"));
        } else {
            dispatch(filterRoomById(id));
        }
    }
    const toLastArray = (array) => {
        if (array) {
            setCurrentItem(array.length-1);
        }
    }

    useEffect (() => {
        switch (context) {
            case "list":
            case "edit_list":
                toLastArray(roomList);
                break;
            case "course":
            case "edit_course":
                toLastArray(courseList);
                break;
            case "edit_user":
                toLastArray(userList);
                break;
            case "edit_test":
                toLastArray(userList);
                break;
            case "edit_lesson":
                toLastArray(lessonList);
                break;
            default:
                setCurrentItem(0);
                break;
        }
    },[roomList, userList, courseList, testList]);

    useEffect (() => {
        setCurrentItem(0);
    },[]);

    const customCarousel  = (children) => (
        <Carousel 
            className="card_container"
            centerMode={true} 
            centerSlidePercentage={55} 
            swipeable
            showIndicators={true} 
            useKeyboardArrows
            stopOnHove={true}
            showThumbs={false}
            showStatus={false}
            selectedItem={currentItem}
            onChange= {(key,card) => setCurrentItem(key)}
        >
            {children}
        </Carousel>
    );

    switch (context) {
        case "list":
            return(
                <div className="card_page shadow">
                    <div className="card_header"> <b>Room</b> 
                        <form onSubmit={(e) => searchByID(e)}>
                            <input type="text" ref={searchInput} className="shadow" placeholder="Search by id"></input>
                            <input type="submit" className="shadow"></input>
                            <button type="button" className="card_menu_button refresh_button_user shadow" onClick={loadRoom}></button>
                        </form>
                    </div>
                    {
                        customCarousel
                        (
                            roomList != null && roomList.length != 0? 
                            roomList.map ((item,key) => 
                            (<Card key={key} room={item} type={"room"} mode={"view"}/>))
                            : (<LoadingContainer style={'spinner'}/>)
                        )
                    }
                </div>
            );
        case "course":
            return(
                <div className="card_page shadow">
                    <div className="card_header"> <b> Course</b> 
                        <button type="button" className="card_menu_button refresh_button_user shadow" onClick={loadCourse}></button>
                    </div>
                    {
                        customCarousel
                        (
                            courseList != null && courseList.length != 0 ? 
                            courseList.map ((item,key) => 
                            (<Card key={key} course={item} type={"course"} mode={"view"}/>))
                            : (<LoadingContainer style={'spinner'}/>)
                        )
                    }
                </div>
            );
        case "test":
            return(
                <div className="card_page shadow">
                    <div className="card_header"> <b>Test</b> 
                        <button type="button" className="card_menu_button refresh_button_user shadow" onClick={loadTest}></button>
                    </div>
                    {
                        customCarousel
                        (
                            testList != null && testList.length != 0? 
                            testList.map ((item,key) => 
                            (<Card key={key} test={item} type={"test"} mode={"view"}/>))
                            : (<LoadingContainer style={'spinner'}/>)
                        )
                    }
                </div>
            );
        case "edit_course":
            return(
                <div className="card_page shadow">
                    <div className="card_header"> <b>Course Management</b> 
                        <>
                        <button type="button" className="card_menu_button add_button shadow" onClick={addCourse}></button>
                        <button type="button" className="card_menu_button refresh_button shadow" onClick={loadCourse}></button>
                        </>
                    </div>
                    {
                        customCarousel
                        (
                            courseList != null && courseList.length != 0 ? 
                            courseList.map ((item,key) => 
                            (<Card key={key} course={item} type={"course"} mode={"edit"}/>))
                            : (<LoadingContainer style={'spinner'}/>)
                        )
                    }
                </div>
            );   
        case "edit_list":
            return(
                <div className="card_page shadow">
                    <div className="card_header"> <b>Room Management</b> 
                        <>
                        <button type="button" className="card_menu_button add_button shadow" onClick={addRoom}></button>
                        <button type="button" className="card_menu_button refresh_button shadow" onClick={loadRoom}></button>
                        </>
                    </div>
                    {
                        customCarousel
                        (
                            roomList != null && roomList.length != 0?
                            roomList.map ((item,key) => 
                            (<Card key={key} room={item} type={"room"} mode={"edit"}/>))
                            : <LoadingContainer style={'spinner'}/>
                        )
                    }
                </div>
            );
        case "edit_user":
            return(
                <div className="card_page shadow">
                    <div className="card_header"> <b>Student Management </b> 
                        <button type="button" className="card_menu_button add_button shadow" onClick={addUser}></button>
                        <button type="button" className="card_menu_button refresh_button shadow" onClick={loadUser}></button>
                    </div>
                    {
                        customCarousel
                        (
                            userList != null && userList.length != 0 ? 
                            userList.filter((user) => user.isUser)
                            .map ((item,key) => 
                            (<Card key={key} user={item} type={"user"} mode={"edit"}/>))
                            : (<LoadingContainer style={'spinner'}/>)
                        )
                    }               
                </div>
            );
        case "edit_test":
            return(
                <div className="card_page shadow">
                    <div className="card_header"> <b>Test Management </b> 
                        <button type="button" className="card_menu_button add_button shadow" onClick={addTest}></button>
                        <button type="button" className="card_menu_button refresh_button shadow" onClick={loadTest}></button>
                    </div>
                    {
                        customCarousel
                        (
                            testList != null && testList.length != 0 ? 
                            testList.map ((item,key) => 
                            (<Card key={key} test={item} type={"test"} mode={"edit"}/>))
                            : (<LoadingContainer style={'spinner'}/>)
                        )
                    }               
                </div>
        );
        case "edit_lesson":
            return(
                <div className="card_page shadow">
                    <div className="card_header"> <b>Lesson Management </b> 
                        <button type="button" className="card_menu_button add_button shadow" onClick={addLesson}></button>
                        <button type="button" className="card_menu_button refresh_button shadow" onClick={loadLesson}></button>
                    </div>
                    {
                        customCarousel
                        (
                            lessonList != null && lessonList.length != 0 ? 
                            lessonList.map ((item,key) => 
                            (<Card key={key} lesson={item} type={"lesson"} mode={"edit"}/>))
                            : (<LoadingContainer style={'spinner'}/>)
                        )
                    }               
                </div>
        );
        default:
            return (<LoadingContainer style={'dot'}/>);
    }
}
export default CardList;