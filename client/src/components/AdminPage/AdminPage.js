import React from 'react';

import NavBar from '../NavBar/NavBar';
import HeadingTitle from '../HeadingTitle/HeadingTitle';
import EditHouseCategory from '../EditHouseCategory/EditHouseCategory';
import EditHouseList from '../EditHouseList/EditHouseList';
import EditBankList from '../EditBankList/EditBankList';
import Footer from '../Footer/Footer';
import './AdminPage.css';

const AdminPage = ({userName}) => {
    return(
        <div>
            <NavBar userName={userName} userMode="admin"/>
            <main>
                <HeadingTitle title="Admin Page" subtitle="Trang quản lý database"/>
                <EditBankList/>
                <EditHouseCategory/>
                <EditHouseList/>
                <Footer/>
            </main>
        </div>
    );
}
export default AdminPage;