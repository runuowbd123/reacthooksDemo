import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Admin from './views/admin';
import Login from './views/login';
import NotFund from './views/notFund';
import Receipts from './views/receipts';
import Welcome from './views/welcome';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact={true} component={Welcome} />
                <Route path="/login" component={Login} />
                <Route path="/admin" component={Admin} />
                <Route path="/receipts" component={Receipts} />
                <Route component={NotFund} />
            </Switch>
        </Router>
    );
};

export default AppRouter;
