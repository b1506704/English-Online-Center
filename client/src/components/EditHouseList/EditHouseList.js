import React from 'react';

import CardPage from '../CardPage/CardPage';

const EditHouseList = ({setCurrentAccList}) => {
    return(
        <CardPage context="edit_list" setCurrentAccList={setCurrentAccList}/>
    );
}
export default EditHouseList;