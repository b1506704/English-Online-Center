import {React, Suspense }from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';
import './MarketingManagerPage.css';

const MarketingManagerPage = ({user}) => {
    const { path } = useRouteMatch();
    return(
        <Suspense fallback={(<LoadingContainer style="bar"/>)}>
            <main>
                <HeadingTitle title="Marketing Manager Dashboard"/>
                <Switch>
                    <Route path={`${path}/advertisement`}>
                        <LoadingContainer/>
                    </Route>
                    <Route path={`${path}/affliation`}>
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
export default MarketingManagerPage;