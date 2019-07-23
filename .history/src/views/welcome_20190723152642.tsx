import * as React from 'react';

import * as _ from 'lodash';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import DisplayContentDemo from './DisplayContentDemo';
import FlexBugDemo from './flexBugDemo';
import './index.scss';
import App from './reactHook/root';
import SvgColorChangeDemo from './svgColorChangeDemo';
import ClipPath from './clipPath';
interface State {
    select: any; // 选中的id
}
interface Props {
    history: any; // 选中的id
}
export default class Welcome extends React.Component<Props, State> {

    public state: State = {
        select: '/',
    };
    constructor(props: Props) {
        super(props);
    }

    public componentDidMount() {
        console.log(window.location.hash);
        this.setState({
            select: ((window.location.hash).split('#'))[1],
        });
        this.props.history.push(((window.location.hash).split('#'))[1]);
    }

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
                        overflow: 'auto',
                    }}
                >
                    {
                        _.map([
                            {
                                key: 'reactHookDemo',
                                link: '/',
                            },
                            {
                                key: 'flex:1的BugDemo',
                                link: '/flexbugdemo',
                            },
                            {
                                key: 'display:content属性的demo',
                                link: '/displaycontentdemo',
                            },
                            {
                                key: 'svg颜色改变',
                                link: '/svgcolorchange',
                            },
                            {
                                key: 'css之clipPath',
                                link: '/clippath',
                            },
                        ], (item) => {
                            return (
                                <Link to={item.link} key={item.key}>
                                    <div
                                        // tslint:disable-next-line:jsx-no-lambda
                                        onClick={() => {
                                            this.setState({
                                                select: item.link,
                                            });
                                        }}
                                        style={{
                                            color: this.state.select === item.link ? '#1890ff' : '#fff',
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
                    <Route path="/" exact={true} component={App} />
                    <Route path="/flexbugdemo" component={FlexBugDemo} />
                    <Route path="/displaycontentdemo" component={DisplayContentDemo}/>
                    <Route path="/svgcolorchange" component={SvgColorChangeDemo}/>
                    <Route path="/clippath" component={ClipPath}/>
                </div>

            </div>
        );
    }
}
