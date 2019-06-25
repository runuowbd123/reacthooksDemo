import * as React from 'react';
import { Link } from 'react-router-dom';

import { Icon } from 'antd';

import Background from '../components/background';
import { App } from '../model';

declare var window: any;

const apps = window.APP_CONF.APPS;

export default class Welcome extends React.Component {

    public renderApps() {
        const appContent = apps && apps.map((app: App) => {
            return (
                <li key={app.id}>
                    <Link to={app.route}>
                        <Icon className="logo" type={app.logo} />
                        <span className="name">{app.name}</span>
                    </Link>
                </li>
            );
        });
        return (
            <ul className="app">
                {appContent}
            </ul>
        );
    }

    public render() {
        return (
            <Background>
                {this.renderApps()}
            </Background>
        );
    }
}
