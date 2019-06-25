import * as React from 'react';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

export default class Welcome extends React.Component {

    public render() {
        return (
            <div>
                i'm sidebar
                {
                    this.props.children || '没路由'
                }
            </div>
        );
    }
}
