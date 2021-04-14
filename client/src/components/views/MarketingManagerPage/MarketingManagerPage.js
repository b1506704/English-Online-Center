import React from 'react';

import NavBar from '../../NavBar/NavBar';
import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import EditBankList from '../../EditBankList/EditBankList';
import Footer from '../../Footer/Footer';
import './MarketingManagerPage.css';

const MarketingManagerPage = ({user}) => {
    return(
        <div>
            <NavBar userName={user ? user.userName : ''} userMode="admin"/>
            <main>
                <HeadingTitle title="Marketing Manager Dashboard" subtitle="Advertisement and Campaign Management"/>
                <EditBankList/>
                <Footer/>
            </main>
        </div>
    );
}
export default MarketingManagerPage;