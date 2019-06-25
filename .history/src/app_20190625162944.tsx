import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Root from './root';
import Admin from './views/admin';
import Login from './views/login';
import NotFund from './views/notFund';
import Receipts from './views/receipts';
import Welcome from './views/welcome';

ReactDOM.render(
    (
        <Welcome />
    ),
    document.getElementById('app'),
);
