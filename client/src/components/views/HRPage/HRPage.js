import {React, Suspense, lazy }from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';
import './HRPage.css';

const HRPage = ({user}) => {
    const { path } = useRouteMatch();
    return(
        <Suspense fallback={(<LoadingContainer style="bar"/>)}>
            <main>
                <HeadingTitle title="Human Resource Manager Dashboard"/>
                <Switch>
                    <Route path={`${path}/employee`}>
                        <LoadingContainer/>
                    </Route>
                    <Route path={`${path}/contact`}>
                        <LoadingContainer/>
                    </Route>
                    <Route path={`${path}/recruitment`}>
                        <LoadingContainer/>
                    </Route>
                    <Route path={`${path}/report`}>
                        <LoadingContainer/>
                    </Route>
                </Switch>
            </main>
        </Suspense>
    );
}
export default HRPage;