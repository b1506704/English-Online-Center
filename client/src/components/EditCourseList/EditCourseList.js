import React from 'react';

import CardPage from '../CardPage/CardPage';

const EditCourseList = ({setCurrentCourseList}) => {
    return(
        <CardPage context="edit_course" setCurrentCourseList={setCurrentCourseList}/>
    );
}
export default EditCourseList;