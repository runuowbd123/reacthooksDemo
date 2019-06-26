import * as React from 'react';

import * as _ from 'lodash';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Root from '../root';
import flexBugDemo from './demo2';

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
                        alignItems: 'center',
                        background: '#29323b',
                        color: '#fff',
                        display: 'flex',
                        height: '50px',
                    }}
                >
                    {
                        _.map([
                            {
                                key: 'reactHookDemo',
                                link: '/',
                            },
                            {
                                key: 'flexBugDemo',
                                link: '/flexbugdemo',
                            },
                        ], (item) => {
                            return (
                                <Link to={item.link}>
                                    <div
                                        style={{
                                            color: '#fff',
                                            padding: '0 20px',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        {item.key}
                                    </div>
                                </Link>
                            );
                        })
                    }
                </div>
                <div
                    style={{
                        background: '#f0f6f9',
                        flex: 1,
                    }}
                >
                    <Route path="/" exact={true} component={Root} />
                    <Route path="/flexbugdemo" component={flexBugDemo} />
                </div>

            </div>
        );
    }
}
