import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Route, IndexRoute } from 'react-router';
import { HashRouter as Router, Switch } from 'react-router-dom';

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
                <Route path="/" component={Welcome}>
                    <IndexRoute component={Root}/>
                </Route>
            </Switch>
        </Router>
    ),
    document.getElementById('app'),
);
