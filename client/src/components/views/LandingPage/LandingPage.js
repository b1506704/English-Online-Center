import React from 'react';

import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import CourseList from '../../CourseList/CourseList';
import RoomList from '../../RoomList/RoomList';
import Footer from '../../Footer/Footer';

const LandingPage = (props) => {
    return(
        <div>
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