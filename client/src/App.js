import {React, useEffect, useState, Suspense, lazy} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch} from 'react-router-dom'

import LoadingContainer from './utils/LoadingContainer/LoadingContainer';
import {fetchRoom, fetchBank, fetchCourse } from './actions/user_actions';
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

const App = () => {
    const dispatch = useDispatch();
    const storeState = useSelector ((state) => state.user_reducer);
    const loginInfo = useSelector((state) => state.user_reducer.login);
    const [title, setTitle] = useState("English Online Center");
    const [subTitle, setSubTitle] = useState("Real-time and highly interactive learning platform");
    
    console.log(storeState);

    useEffect(()=> {
            dispatch(fetchRoom());
            dispatch(fetchBank());
            dispatch(fetchCourse());
    },[title]);
    
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
                </Switch>
            </Suspense>
        </>
    );
}

export default App;