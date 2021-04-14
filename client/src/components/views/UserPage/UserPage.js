import {React, Suspense, lazy }from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import CourseList from '../../CourseList/CourseList';
import RoomList from '../../RoomList/RoomList';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';
import Footer from '../../Footer/Footer';

const UserPage = ({user}) => {
    const { path } = useRouteMatch();
    return(
        <Suspense fallback={(<LoadingContainer style="bar"/>)}>
            <main>
                <HeadingTitle title="User Dashboard"/>
                <Switch>
                    <Route path={`${path}/room`}>
                        <RoomList/>
                    </Route>
                    <Route path={`${path}/course`}>
                        <CourseList/>
                    </Route>
                    <Route path={`${path}/progress`}>
                        <LoadingContainer/>
                    </Route>
                    <Route path={`${path}/information`}>
                        <LoadingContainer/>
                    </Route>
                </Switch>
            </main>
        </Suspense>
    );
}
export default UserPage;