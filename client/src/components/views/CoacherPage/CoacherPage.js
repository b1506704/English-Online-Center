import {React, Suspense, lazy }from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import EditCourseList from '../../EditCourseList/EditCourseList';
import EditRoomList from '../../EditRoomList/EditRoomList';
import Footer from '../../Footer/Footer';
import './CoacherPage.css';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';

const CoacherPage = () => {

    const { path } = useRouteMatch();

    return(
        <Suspense fallback={(<LoadingContainer style="bar"/>)}>
            <main>
                <HeadingTitle title="Coacher Dashboard"/>
                <Switch>
                    <Route path={`${path}/room`}>
                        <EditRoomList/>
                    </Route>
                    <Route path={`${path}/student`}>
                        <EditCourseList/>
                    </Route>
                    <Route path={`${path}/test`}>
                        <LoadingContainer/>
                    </Route>
                    <Route path={`${path}/files`}>
                        <LoadingContainer/>
                    </Route>
                </Switch>
                {/* <LoadingContainer/> */}
                {/* <Footer/> */}
            </main>
        </Suspense>
    );
}
export default CoacherPage;