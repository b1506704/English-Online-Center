import React from 'react';

import NavBar from '../../NavBar/NavBar';
import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import EditCourseList from '../../EditCourseList/EditCourseList';
import EditRoomList from '../../EditRoomList/EditRoomList';
import Footer from '../../Footer/Footer';
import './CoacherPage.css';

const CoacherPage = ({user}) => {
    return(
        <div>
            <NavBar userName={user ? user.userName : ''} userMode="admin"/>
            <main>
                <HeadingTitle title="Coacher Dashboard" subtitle="Room and Student Management"/>
                <EditCourseList/>
                <EditRoomList/>
                <Footer/>
            </main>
        </div>
    );
}
export default CoacherPage;