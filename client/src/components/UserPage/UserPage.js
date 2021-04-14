import React from 'react';

import NavBar from '../NavBar/NavBar';
import HeadingTitle from '../HeadingTitle/HeadingTitle';
import HouseCategory from '../HouseCategory/HouseCategory';
import HouseList from '../HouseList/HouseList';
import Footer from '../Footer/Footer';

const UserPage = ({user}) => {
    return(
        <div>
            <NavBar userName={user.userName} userMode="user"/>
            <main>
                <HeadingTitle title={`Chào mừng ${user.userName} đến với sàn giao dịch`} subtitle={"Giao dịch uy tín, chất lượng"}/>
                <HouseCategory/>
                <HouseList/>
                <Footer/>
            </main>
        </div>
    );
}
export default UserPage;