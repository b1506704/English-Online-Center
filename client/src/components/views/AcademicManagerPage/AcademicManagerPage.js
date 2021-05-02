import {React, Suspense }from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import EditCourseList from '../../EditCourseList/EditCourseList';
import './AcademicManagerPage.css';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';

const AcademicManagerPage = ({user}) => {
    const { path } = useRouteMatch();
    return(
        <Suspense fallback={(<LoadingContainer style="bar"/>)}>
            <main>
                <HeadingTitle title="Academic Manager Dashboard"/>
                <Switch>
                    <Route path={`${path}/test`}>
                        <LoadingContainer/>
                    </Route>
                    <Route path={`${path}/course`}>
                        <EditCourseList/>
                    </Route>
                    <Route path={`${path}/coacher`}>
                        <LoadingContainer/>
                    </Route>
                    <Route path={`${path}/curriculum`}>
                        <LoadingContainer/>
                    </Route>
                </Switch>
            </main>
        </Suspense>
    );
}
export default AcademicManagerPage;