import React from 'react';

import NavBar from '../../NavBar/NavBar';
import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import EditCourseList from '../../EditCourseList/EditCourseList';
import Footer from '../../Footer/Footer';
import './CenterManagerPage.css';

const CenterManagerPage = ({user}) => {
    return(
        <div>
            <NavBar userName={user ? user.userName : ''} userMode="admin"/>
            <main>
                <HeadingTitle title="Center Manager Dashboard" subtitle="Center Management"/>
                <EditCourseList/>
                <Footer/>
            </main>
        </div>
    );
}
export default CenterManagerPage;