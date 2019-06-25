import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import Welcome from './views/welcome';

ReactDOM.render(
    (
        <BrowserRouter>
            <Route path="/" component={Welcome} />
        </BrowserRouter>
    ),
    document.getElementById('app'),
);
