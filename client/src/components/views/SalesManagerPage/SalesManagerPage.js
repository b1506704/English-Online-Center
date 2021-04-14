import React from 'react';

import NavBar from '../../NavBar/NavBar';
import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import EditBankList from '../../EditBankList/EditBankList';
import Footer from '../../Footer/Footer';
import './SalesManagerPage.css';

const SalesManagerPage = ({user}) => {
    return(
        <div>
            <NavBar userName={user ? user.userName : ''} userMode="admin"/>
            <main>
                <HeadingTitle title="Sales Manager Dashboard" subtitle="Sales Management"/>
                <EditBankList/>
                <Footer/>
            </main>
        </div>
    );
}
export default SalesManagerPage;