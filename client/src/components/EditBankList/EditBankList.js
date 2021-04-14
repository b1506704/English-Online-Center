import React from 'react';

import CardPage from '../CardPage/CardPage';

const EditBankList = ({setCurrentCardList}) => {
    return(
        <CardPage context="edit_card" setCurrentCardList={setCurrentCardList}/>
    );
}
export default EditBankList;