import {React, Suspense }from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import './RoomPage.css';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';
import ClassRoom from '../../ClassRoom/ClassRoom';

const RoomPage = (props) => {

    const { path } = useRouteMatch();

    return(
        <Suspense fallback={(<LoadingContainer style="bar"/>)}>
            <main>
                <HeadingTitle title="Room #1"/>
                <ClassRoom/>
                <Switch>
                    <Route path={`${path}/oral`}>
                        <LoadingContainer/>
                    </Route>
                    <Route path={`${path}/test`}>
                        <LoadingContainer/>
                    </Route>
                    <Route path={`${path}/files`}>
                        <LoadingContainer/>
                    </Route>
                </Switch>
            </main>
        </Suspense>
    );
}
export default RoomPage;