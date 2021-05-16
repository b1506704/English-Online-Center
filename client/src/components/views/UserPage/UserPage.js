import {React, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import CourseList from '../../CourseList/CourseList';
import RoomList from '../../RoomList/RoomList';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';
import RoomDetail from '../../RoomDetail/RoomDetail';
import Selection from '../../Selection/Selection';
import StudyProgress from '../../StudyProgress/StudyProgress';
import TestList from '../../TestList/TestList';
// import EditTestList from '../../EditTestList/EditTestList';

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
                        <StudyProgress/>
                    </Route>
                    <Route exact path={`${path}/information`}>
                        <TestList/>    
                        {/* <EditTestList/>                     */}
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