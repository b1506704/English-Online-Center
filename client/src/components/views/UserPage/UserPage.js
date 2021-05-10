import {React, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import CourseList from '../../CourseList/CourseList';
import RoomList from '../../RoomList/RoomList';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';
import RoomDetail from '../../RoomDetail/RoomDetail';
import Selection from '../../Selection/Selection';

const UserPage = ({user}) => {
    const { path } = useRouteMatch();
    return(
        <Suspense fallback={(<LoadingContainer style="bar"/>)}>
            <main>
                <HeadingTitle title="User Dashboard"/>
                <Switch>
                    <Route exact path={`${path}`}>
                        <Selection user="user"/>
                    </Route>
                    <Route exact path={`${path}/course`}>
                        <CourseList/>
                    </Route>
                    <Route exact path={`${path}/progress`}>
                        <LoadingContainer/>
                    </Route>
                    <Route exact path={`${path}/information`}>
                        {/* test */}
                        <LoadingContainer/>
                    </Route>
                    <Route exact path={`${path}/room`}>
                        <RoomList/>
                    </Route>
                    <Route path={`${path}/room/:id`}>
                        <RoomDetail/>    
                    </Route>
                </Switch>
            </main>
        </Suspense>
    );
}
export default UserPage;