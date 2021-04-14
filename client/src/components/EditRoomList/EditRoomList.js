import React from 'react';

import CardPage from '../CardList/CardList';

const EditRoomList = ({setCurrentAccList}) => {
    return(
        <CardPage context="edit_list" setCurrentAccList={setCurrentAccList}/>
    );
}
export default EditRoomList;