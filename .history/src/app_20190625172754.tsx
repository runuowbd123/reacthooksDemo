import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';

import Welcome from './views/welcome';

ReactDOM.render(
    (
        <HashRouter>
            <Route path="/" component={Welcome} />
        </HashRouter>
    ),
    document.getElementById('app'),
);
