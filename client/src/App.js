import {React, useEffect, useState, Suspense, lazy} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import LoadingContainer from './utils/LoadingContainer/LoadingContainer';
import {fetchRoom, fetchBank, fetchCourse } from './actions/user_actions';
import * as auth from './utils/FakeAuth.js';
import './App.css';
import NavBar from './components/NavBar/NavBar';


const LandingPage = lazy(() => import ('./components/views/LandingPage/LandingPage'));
const UserPage = lazy(() => import ('./components/views/UserPage/UserPage'));
const CoacherPage = lazy(() => import ('./components/views/CoacherPage/CoacherPage'));
const SalesManagerPage = lazy(() => import ('./components/views/SalesManagerPage/SalesManagerPage'));
const MarketingManagerPage = lazy(() => import ('./components/views//MarketingManagerPage/MarketingManagerPage'));
const CenterManagerPage = lazy(() => import ('./components/views/CenterManagerPage/CenterManagerPage'));
const AcademicManagerPage = lazy(() => import ('./components/views/AcademicManagerPage/AcademicManagerPage'));
const HRPage = lazy(() => import ('./components/views/HRPage/HRPage'));
const RoomPage = lazy(() => import ('./components/views/RoomPage/RoomPage'));

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const storeState = useSelector ((state) => state.user_reducer);
    const loginInfo = useSelector((state) => state.user_reducer.loggedInUser);
    const [title, setTitle] = useState("English Online Center");
    const [subTitle, setSubTitle] = useState("Real-time and highly interactive learning platform");
    
    console.log(storeState);

    useEffect(()=> {
        dispatch(fetchRoom());
        dispatch(fetchBank());
        dispatch(fetchCourse());
        if (loginInfo) {
            if (auth.isHRManager(loginInfo)) history.push('/hr');
            if (auth.isSalesManager(loginInfo)) history.push('/sales');
            if (auth.isCoacher(loginInfo)) history.push('/coacher');
            if (auth.isUser(loginInfo)) history.push('/user');
            if (auth.isAcademicManager(loginInfo)) history.push('/academic');
            if (auth.isCenterManager(loginInfo)) history.push('/center');
            if (auth.isMarketingManager(loginInfo)) history.push('/marketing');
        }
    },[loginInfo]);

      
    return (
        <>
            <NavBar/>
            <Suspense fallback={(<LoadingContainer style="bar"/>)}>
                <Switch>
                    <Route exact path="/" >
                        <LandingPage title={title} subTitle={subTitle}/>
                    </Route>
                    <Route path="/user">
                        <UserPage user={loginInfo}/>
                    </Route>
                    <Route path="/coacher">
                        <CoacherPage user={loginInfo}/>
                    </Route>
                    <Route path="/sales">
                        <SalesManagerPage user={loginInfo}/>
                    </Route>
                    <Route path="/hr">
                        <HRPage user={loginInfo}/>
                    </Route>
                    <Route path="/academic">
                        <AcademicManagerPage user={loginInfo}/>
                    </Route>
                    <Route path="/center">
                        <CenterManagerPage user={loginInfo}/>
                    </Route>
                    <Route path="/marketing">
                        <MarketingManagerPage user={loginInfo}/>
                    </Route>
                    <Route path="/room">
                        <RoomPage user={loginInfo}/>
                    </Route>
                </Switch>
            </Suspense>
        </>
    );
}

export default App;