import React from 'react';

import NavBar from '../NavBar/NavBar';
import HeadingTitle from '../HeadingTitle/HeadingTitle';
import EditBankList from '../EditBankList/EditBankList';
import Footer from '../Footer/Footer';
import './HRPage.css';

const HRPage = ({user}) => {
    return(
        <div>
            <NavBar userName={user ? user.userName : ''} userMode="admin"/>
            <main>
                <HeadingTitle title="Human Resource Dashboard" subtitle="Recruitment Management"/>
                <EditBankList/>
                <Footer/>
            </main>
        </div>
    );
}
export default HRPage;