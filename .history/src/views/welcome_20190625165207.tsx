import * as React from 'react';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Root from '../root';

export default class Welcome extends React.Component {

    public render() {
        return (
            <div
                style={{
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    left: 0,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                }}
            >
                <div
                    style={{
                        background: '#29323b',
                        color: '#fff',
                        height: '50px',
                    }}
                >
                    i'm sidebar
                </div>
                <div></div>

            </div>
        );
    }
}
