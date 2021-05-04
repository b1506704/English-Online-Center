import {React, Suspense }from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import EditUserList from '../../EditUserList/EditUserList';
import EditRoomList from '../../EditRoomList/EditRoomList';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';
import EditTestList from '../../EditTestList/EditTestList';
import EditTestDetail from '../../EditTestDetail/EditTestDetail';
import Selection from '../../Selection/Selection';
import './CoacherPage.css';

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
                    <Route path={`${path}/files`}>
                        <LoadingContainer/>
                    </Route>
                </Switch>
            </main>
        </Suspense>
    );
}
export default CoacherPage;