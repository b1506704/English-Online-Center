import {React, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NavBar from './components/NavBar/NavBar';
import HouseCategory from './components/HouseCategory/HouseCategory';
import HouseList from './components/HouseList/HouseList';
import UserPage from './components/UserPage/UserPage';
import AdminPage from './components/AdminPage/AdminPage';
import HeadingTitle from './components/HeadingTitle/HeadingTitle';
import LoadingContainer from './utils/LoadingContainer/LoadingContainer';
import Footer from './components/Footer/Footer';
import {fetchHouse, fetchBank, fetchCategory } from './actions/user_actions';
import './App.css';

const App = () => {
    const dispatch = useDispatch();
    const storeState = useSelector ((state) => state.user_reducer);
    const loginInfo = useSelector((state) => state.user_reducer.login);
    const [title, setTitle] = useState("Dịch vụ mua bán bất động sản RealEstaee");
    const [subTitle, setSubTitle] = useState("Giao dịch uy tín, nhanh chóng");
    
    console.log(storeState);


    useEffect(()=> {
        dispatch(fetchHouse());
    },[title]);
    
    useEffect(()=> {
        dispatch(fetchBank());
    },[title]);

    useEffect(()=> {
        dispatch(fetchCategory());
    },[title]);
    
    if (loginInfo!= null && loginInfo.isAdmin === true) {
        return (<AdminPage userName ={loginInfo.userName}/>);
    } else if (loginInfo!= null && loginInfo.isAdmin === false){
        return (
            <UserPage user={loginInfo}/>
        );
    } else if (loginInfo === undefined || loginInfo === null){
        return(
            <div>
                <NavBar/>
                <main>
                    <HeadingTitle title={title} subtitle={subTitle} />
                    <HouseCategory/>
                    <HouseList/>
                    <Footer/>
                </main>
            </div>
        );
    } else {
        return (<LoadingContainer style={"spinner"}/>)
    }
}

export default App;