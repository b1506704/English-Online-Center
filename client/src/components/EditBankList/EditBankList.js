import React from 'react';

import CardList from '../CardList/CardList';

const EditBankList = ({setCurrentCardList}) => {
    return(
        <CardList context="edit_card" setCurrentCardList={setCurrentCardList}/>
    );
}
export default EditBankList;