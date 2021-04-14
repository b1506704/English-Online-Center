import React from 'react';

import CardPage from '../CardPage/CardPage';

const EditRoomList = ({setCurrentAccList}) => {
    return(
        <CardPage context="edit_list" setCurrentAccList={setCurrentAccList}/>
    );
}
export default EditRoomList;