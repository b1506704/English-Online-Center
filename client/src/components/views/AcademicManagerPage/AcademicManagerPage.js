import React from 'react';

import NavBar from '../../NavBar/NavBar';
import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import EditCourseList from '../../EditCourseList/EditCourseList';
import Footer from '../../Footer/Footer';
import './AcademicManagerPage.css';

const AcademicManagerPage = ({user}) => {
    return(
        <div>
            <NavBar userName={user ? user.userName : ''} userMode="admin"/>
            <main>
                <HeadingTitle title="Academic Manager Dashboard" subtitle="Course And Coacher Management"/>
                <EditCourseList/>
                <Footer/>
            </main>
        </div>
    );
}
export default AcademicManagerPage;