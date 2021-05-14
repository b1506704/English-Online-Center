import {React, Suspense }from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import EditUserList from '../../EditUserList/EditUserList';
import EditRoomList from '../../EditRoomList/EditRoomList';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';
import EditTestList from '../../EditTestList/EditTestList';
import EditTestDetail from '../../EditTestDetail/EditTestDetail';
import EditCourseDetail from '../../EditCourseDetail/EditCourseDetail';
import Selection from '../../Selection/Selection';
import './CoacherPage.css';
import EditCourseList from '../../EditCourseList/EditCourseList';

const CoacherPage = () => {

    const { path } = useRouteMatch();

    return(
        <Suspense fallback={(<LoadingContainer style="bar"/>)}>
            <main>
                <HeadingTitle title="Coacher Dashboard"/>
                <Switch>
                    <Route exact path={`${path}`}>
                        <Selection user="coacher"/>
                    </Route>
                    <Route path={`${path}/room`}>
                        <EditRoomList/>
                    </Route>
                    <Route path={`${path}/student`}>
                        <EditUserList/>
                    </Route>
                    <Route exact path={`${path}/test`}>
                        <EditTestList/>
                    </Route>
                    <Route path={`${path}/test/:id`}>
                        <EditTestDetail/>
                    </Route>
                    <Route exact path={`${path}/course`}>
                        <EditCourseList/>
                    </Route>
                    <Route path={`${path}/course/:id`}>
                        <EditCourseDetail/>
                    </Route>
                    {/* if coacher is also admin */}
                    <Route path={`${path}/admin`}>
                        {/* manage coachers, students,
                            statistic  */}
                        <EditUserList/>
                    </Route>
                </Switch>
            </main>
        </Suspense>
    );
}
export default CoacherPage;