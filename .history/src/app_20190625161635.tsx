import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Root from './root';

import Admin from './views/admin';
import Login from './views/login';
import NotFund from './views/notFund';
import Receipts from './views/receipts';
import Welcome from './views/welcome';

ReactDOM.render(
    (
        <Router>
            <Switch>
                <Route path="/" exact={true} component={Welcome} />
                <Route path="/login" component={Login} />
                <Route path="/admin" component={Admin} />
                <Route path="/receipts" component={Receipts} />
                <Route component={NotFund} />
            </Switch>
        </Router>
    ),
    document.getElementById('app'),
);
