import React from 'react';

import CardPage from '../CardList/CardList';

const EditBankList = ({setCurrentCardList}) => {
    return(
        <CardPage context="edit_card" setCurrentCardList={setCurrentCardList}/>
    );
}
export default EditBankList;