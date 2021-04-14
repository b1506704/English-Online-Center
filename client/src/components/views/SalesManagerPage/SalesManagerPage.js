import {React, Suspense, lazy }from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import EditBankList from '../../EditBankList/EditBankList';
import './SalesManagerPage.css';
import LoadingContainer from '../../../utils/LoadingContainer/LoadingContainer';

const SalesManagerPage = ({user}) => {
    const { path } = useRouteMatch();
    return(
        <Suspense fallback={(<LoadingContainer style="bar"/>)}>
            <main>
                <HeadingTitle title="Sales Manager Dashboard"/>
                <Switch>
                    <Route path={`${path}/income`}>
                        <LoadingContainer/>
                    </Route>
                    <Route path={`${path}/payment`}>
                        <EditBankList/>
                    </Route>
                    <Route path={`${path}/discount`}>
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
export default SalesManagerPage;