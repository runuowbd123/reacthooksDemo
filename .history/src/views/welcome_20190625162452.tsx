import * as React from 'react';
import { Link } from 'react-router-dom';

import { Icon } from 'antd';

import Background from '../components/background';
import { App } from '../model';

declare var window: any;

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
