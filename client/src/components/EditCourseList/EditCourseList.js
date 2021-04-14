import React from 'react';
import { useParams } from 'react-router-dom';

import CardList from '../CardList/CardList';

const EditCourseList = ({setCurrentCourseList}) => {
    const { name } = useParams();
    return(
        <CardList context="edit_course" setCurrentCourseList={setCurrentCourseList}/>
    );
}
export default EditCourseList;