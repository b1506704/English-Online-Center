import {React, Suspense }from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import EditUserList from '../../EditUserList/EditUserList';
import EditRoomList from '../../EditRoomList/EditRoomList';
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
                        <EditUserList/>
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
export default CoacherPage;