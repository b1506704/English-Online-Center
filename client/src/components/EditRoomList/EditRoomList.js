import React from 'react';
import { useParams } from 'react-router-dom';

import CardList from '../CardList/CardList';

const EditRoomList = ({setCurrentAccList}) => {
    const { name } = useParams();
    return(
        <CardList context="edit_list" setCurrentAccList={setCurrentAccList}/>
    );
}
export default EditRoomList;