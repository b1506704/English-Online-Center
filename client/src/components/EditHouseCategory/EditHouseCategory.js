import React from 'react';

import CardPage from '../CardPage/CardPage';

const EditHouseCategory = ({setCurrentCategoryList}) => {
    return(
        <CardPage context="edit_category" setCurrentCategoryList={setCurrentCategoryList}/>
    );
}
export default EditHouseCategory;