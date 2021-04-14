import React from 'react';

import NavBar from '../../NavBar/NavBar';
import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import CourseList from '../../CourseList/CourseList';
import RoomList from '../../RoomList/RoomList';
import Footer from '../../Footer/Footer';

const UserPage = ({user}) => {
    return(
        <div>
            <NavBar userName={user ? user.userName : ''} userMode="user"/>
            <main>
                <HeadingTitle title={`Welcome to English Online Center Mr/Ms ${user ? user.userName : ''}`} subtitle={"It's a pleasure to have you here with us!"}/>
                <CourseList/>
                <RoomList/>
                <Footer/>
            </main>
        </div>
    );
}
export default UserPage;