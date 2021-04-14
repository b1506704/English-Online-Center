import {React, useEffect, useState, Suspense, lazy} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch} from 'react-router-dom'

import LoadingContainer from './utils/LoadingContainer/LoadingContainer';
import {fetchRoom, fetchBank, fetchCourse } from './actions/user_actions';
import './App.css';

const LandingPage = lazy(() => import ('./components/LandingPage/LandingPage'));
const UserPage = lazy(() => import ('./components/UserPage/UserPage'));
const CoacherPage = lazy(() => import ('./components/CoacherPage/CoacherPage'));
const SalesManagerPage = lazy(() => import ('./components/SalesManagerPage/SalesManagerPage'));
const MarketingManagerPage = lazy(() => import ('./components/MarketingManagerPage/MarketingManagerPage'));
const CenterManagerPage = lazy(() => import ('./components/CenterManagerPage/CenterManagerPage'));
const AcademicManagerPage = lazy(() => import ('./components/AcademicManagerPage/AcademicManagerPage'));
const HRPage = lazy(() => import ('./components/HRPage/HRPage'));

const App = () => {
    const dispatch = useDispatch();
    const storeState = useSelector ((state) => state.user_reducer);
    const loginInfo = useSelector((state) => state.user_reducer.login);
    const [title, setTitle] = useState("English Online Center");
    const [subTitle, setSubTitle] = useState("Real-time and highly interactive learning platform");
    
    console.log(storeState);


    useEffect(()=> {
        dispatch(fetchRoom());
    },[title]);
    
    useEffect(()=> {
        dispatch(fetchBank());
    },[title]);

    useEffect(()=> {
        dispatch(fetchCourse());
    },[title]);

    

    // if (loginInfo!= null && loginInfo.isCoacher === true) {
    //         return (<CoacherPage userName ={loginInfo.userName}/>);
    //     } else if (loginInfo!= null && loginInfo.isCoacher === false){
    //         return (
    //             <UserPage user={loginInfo}/>
    //         );
    // }
    
    return (
        <Suspense fallback={(<LoadingContainer style="bar"/>)}>
            <Switch>
                <Route exact path="/" >
                    <LandingPage title={title} subTitle={subTitle}/>
                </Route>
                <Route exact path="/user">
                    <UserPage user={loginInfo}/>
                </Route>
                <Route exact path="/coacher">
                    <CoacherPage user={loginInfo}/>
                </Route>
                <Route exact path="/sales">
                    <SalesManagerPage user={loginInfo}/>
                </Route>
            </Switch>
        </Suspense>
    );
    

    // if (loginInfo!= null && loginInfo.isCoacher === true) {
    //     return (<CoacherPage userName ={loginInfo.userName}/>);
    // } else if (loginInfo!= null && loginInfo.isCoacher === false){
    //     return (
    //         <UserPage user={loginInfo}/>
    //     );
    // } else if (loginInfo === undefined || loginInfo === null){
    //     return(
    //         <div>
    //             <NavBar/>
    //             <main>
    //                 <HeadingTitle title={title} subtitle={subTitle} />
    //                 <CourseList/>
    //                 <RoomList/>
    //                 <Footer/>
    //             </main>
    //         </div>
    //     );
    // } else {
    //     return (<LoadingContainer style={"spinner"}/>)
    // }
}

export default App;