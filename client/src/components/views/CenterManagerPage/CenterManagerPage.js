import {React, Suspense, lazy }from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import EditCourseList from '../../EditCourseList/EditCourseList';
import Footer from '../../Footer/Footer';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';
import './CenterManagerPage.css';

const CenterManagerPage = ({user}) => {
    const { path } = useRouteMatch();
    return(
        <Suspense fallback={(<LoadingContainer style="bar"/>)}>
            <main>
                <HeadingTitle title="Center Manager Dashboard"/>
                <Switch>
                    <Route path={`${path}/employee`}>
                        <LoadingContainer/>
                    </Route>
                    <Route path={`${path}/schedule`}>
                        <EditCourseList/>
                    </Route>
                    <Route path={`${path}/activity`}>
                        <LoadingContainer/>
                    </Route>
                    <Route path={`${path}/maintenance`}>
                        <LoadingContainer/>
                    </Route>
                </Switch>
            </main>
        </Suspense>
    );
}
export default CenterManagerPage;