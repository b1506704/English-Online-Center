import {Children, React, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Carousel} from 'react-responsive-carousel'

import Card from './Card/Card';
import LoadingContainer from '../../utils/LoadingContainer/LoadingContainer';
import {createRoom, createBank, createCourse, fetchCourse, fetchBank, fetchRoom, setNotification, filterRoomByPrice } from '../../actions/user_actions';
import random from '../../utils/RandomNumber';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './CardList.css';

const CardList = ({context}) => {
    const dispatch = useDispatch();
    const roomList = useSelector((state) => state.user_reducer.roomList);
    const bankList = useSelector((state) => state.user_reducer.bankList);
    const courseList = useSelector((state) => state.user_reducer.courseList);
    const bankProvider = ["Agribank","BIDV","Sacombank","Vietcombank"];   
    const bankValue = [2, 5, 10, 20, 50, 100];   
    const searchInput = useRef(null);
    const [currentItem, setCurrentItem] = useState(0);

    const addRoom = () => {
        dispatch(
            createRoom(
                {
                    id: random(1,2000),  
                    price: random(1,200),
                    course: courseList !=null && courseList.length!= 0 ? courseList[random(0,  courseList.length - 1)].name : null,
                    imgUrl: null,
                    isFull: false, 
                    roomCoacher: 'admin',
                    start: random(1,1000),
                    end: random(1,1000),
                }
            )
        );
    }
    const addBank = () => {
        dispatch(createBank(
            {
                id: random(1,2000),
                provider: bankProvider[random(0, bankProvider.length-1)],
                value: bankValue[random(0, bankValue.length-1)]
            }
        ));
    }
    const addCourse = () => {
        dispatch(createCourse(
            {
                name: random(1,2000),
                imgUrl: null,
                roomNum: 0,
                sellNum: 0
            }));
    }

    const loadCourse = () => {
        dispatch(fetchCourse())
        .then(() => dispatch(setNotification("Successfully Updated")));
    }

    const loadBank = () => {
        dispatch(fetchBank())
        .then(() => dispatch(setNotification("Successfully Updated")));
    }

    const loadRoom = () => {
        dispatch(fetchRoom())
        .then(() => dispatch(setNotification("Successfully Updated")));
    }
    
    const searchByPrice = (e) => {
        e.preventDefault();
        const price = parseFloat(searchInput.current.value);
        if (isNaN(price)) {
            dispatch(setNotification("Not A Valid Value"));
        } else {
            dispatch(filterRoomByPrice(price));
        }
    }

    const customCarousel  = (children) => (
        <Carousel 
            className="card_container"
            centerMode={true} 
            centerSlidePercentage={65} 
            swipeable
            autoPlay 
            infiniteLoop 
            useKeyboardArrows
            stopOnHove={false}
            showThumbs={false}
            showStatus={false}
            onChange= {(key,card) => setCurrentItem(key)}
        >
            {children}
        </Carousel>
    );

    switch (context) {
        case "list":
            return(
                <div className="card_page">
                    <div className="card_header"> <b>Room ({currentItem + 1} of {roomList ? roomList.length : 0})</b> 
                        <button type="button" className="card_menu_button refresh_button_user shadow" onClick={loadRoom}></button>
                        <form onSubmit={(e) => searchByPrice(e)}>
                            <input type="text" ref={searchInput} className="shadow" placeholder="Search by price"></input>
                            <input type="submit" className="shadow"></input>
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
                <div className="card_page">
                    <div className="card_header"> <b> Course ({currentItem + 1} of {courseList ? courseList.length : 0})</b> 
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
        case "edit_course":
            return(
                <div className="card_page">
                    <div className="card_header"> <b>Course Management ({currentItem + 1} of {courseList ? courseList.length : 0})</b> 
                        <button type="button" className="card_menu_button add_button shadow" onClick={addCourse}></button>
                        <button type="button" className="card_menu_button refresh_button shadow" onClick={loadCourse}></button>
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
                <div className="card_page">
                    <div className="card_header"> <b>Room Management ({currentItem + 1} of {roomList ? roomList.length : 0})</b> 
                        <button type="button" className="card_menu_button add_button shadow" onClick={addRoom}></button>
                        <button type="button" className="card_menu_button refresh_button shadow" onClick={loadRoom}></button>
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
        case "edit_card":
            return(
                <div className="card_page">
                    <div className="card_header"> <b>Bank Management ({currentItem + 1} of {bankList ? bankList.length : 0})</b> 
                        <button type="button" className="card_menu_button add_button shadow" onClick={addBank}></button>
                        <button type="button" className="card_menu_button refresh_button shadow" onClick={loadBank}></button>
                    </div>
                    {
                        customCarousel
                        (
                            bankList != null && bankList.length != 0 ?
                            bankList.map ((item,key) => 
                            (<Card key={key} bank={item} type={"bank"} mode={"edit"}/>))
                            : <LoadingContainer style={'spinner'}/>
                        )
                    }
                </div>
            );                
        default:
            return (<LoadingContainer style={'dot'}/>);
    }
}
export default CardList;