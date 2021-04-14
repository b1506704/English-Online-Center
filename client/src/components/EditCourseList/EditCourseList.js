import React from 'react';

import CardPage from '../CardList/CardList';

const EditCourseList = ({setCurrentCourseList}) => {
    return(
        <CardPage context="edit_course" setCurrentCourseList={setCurrentCourseList}/>
    );
}
export default EditCourseList;