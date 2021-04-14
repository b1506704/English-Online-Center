import React from 'react';

import NavBar from '../NavBar/NavBar';
import HeadingTitle from '../HeadingTitle/HeadingTitle';
import CourseList from '../CourseList/CourseList';
import RoomList from '../RoomList/RoomList';
import Footer from '../Footer/Footer';

const LandingPage = (props) => {
    return(
        <div>
            <NavBar/>
            <main>
                <HeadingTitle title={props.title} subtitle={props.subTitle}/>
                <CourseList/>
                <RoomList/>
                <Footer/>
            </main>
        </div>
    );
}
export default LandingPage;