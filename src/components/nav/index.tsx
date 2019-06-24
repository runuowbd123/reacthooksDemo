import * as React from 'react';

import { Dropdown, Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';

import UserContext from '../../context/user';

import './style.scss';

function renderATagMenuItems(menuItems: any[]) {
    return menuItems && menuItems.length > 0 ? menuItems.map((menu) => {
        return menu.enable ? (
            <Menu.Item key={menu.id}>
                <a href={menu.link} target={menu.target} className="dropdown-content">
                    {(menu.enableIcon) &&  <span className={`iconfont icon-${menu.className || ''}`}/>}
                    {menu.name}
                </a>
            </Menu.Item>
        ) : '';
    }) : [];
}

export function Logo(props: any) {
    const { linkTo, img } = props;
    return (
        <Link to={linkTo}><img alt="logo" src={img} /></Link>
    );
}

export function MenuLeft(props: any) {
    const { activeKey, onClick, menuItems, customItems = [] } = props;
    return (
        <div className="menu left">
            <Menu
                className="my-menu"
                onClick={onClick}
                selectedKeys={[activeKey]}
                mode="horizontal"
            >
                {customItems.concat(renderATagMenuItems(menuItems))}
            </Menu>
        </div>
    );
}

export function MenuRight(props: any) {
    const {
        onClick, settingMenus,
    } = props;

    const userCtx = React.useContext(UserContext);
    const user = userCtx.user;
    const isLogin = user && user.userName;

    const userMenu = (
        <Menu onClick={onClick}>
            {renderATagMenuItems(settingMenus)}
            <Menu.Item key="logout">
                <a className="dropdown-content" href="javascript:void(0)">
                    {isLogin ? '退出登录' : '去登录'}
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="menu right">
            <menu className="menu-right">
                <Dropdown overlay={userMenu} trigger={['click']}>
                    <div className="user-info">
                        <Icon className="avatar" type="user" />
                        <span className="user-name" title={user && user.userName}>
                            {(user && user.userName) || '未登录'}
                        </span>
                    </div>
                </Dropdown>
            </menu>
        </div>
    );
}

class Navigator extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            current: '',
        };
    }

    public componentDidMount() {
        this.updateSelected();
    }

    public componentDidUpdate(prevProps: any) {
        if (this.props.routing) {
            if (
                this.props.routing.locationBeforeTransitions.pathname !==
                prevProps.routing.locationBeforeTransitions.pathname) {
                this.updateSelected();
            }
        }
    }

    public updateSelected = () => {
        const menuItems = this.props.menuItems;
        const pathname = `${window.location.pathname}${window.location.hash}`;
        if (menuItems && menuItems.length > 0) {
            const pathFund = menuItems.find((item: any) => {
                return pathname.indexOf(item.id) > -1;
            });

            if (pathFund) {
                this.setState({
                    current: pathFund.id,
                });
            } else {
                this.setState({
                    current: menuItems[0].id,
                });
            }
        }
    }

    public render() {
        const {
            logo,
            menuItems,
            settingMenus,
            menuLeft, menuRight,
            logoWidth, customItems,
            onClickLeftMenu,
            onClickRightMenu,
        } = this.props;
        const { current } = this.state;
        const menuLeftContent = menuLeft || (
            <MenuLeft
                activeKey={current}
                customItems={customItems}
                menuItems={menuItems}
                onClick={onClickLeftMenu}
            />
        );
        const menuRightContent = menuRight || (
            <MenuRight
                activeKey={current}
                onClick={onClickRightMenu}
                settingMenus={settingMenus}
            />
        );
        return (
            <header className="header">
                <div style={{ width: logoWidth }} className="logo left txt-left">
                    {logo}
                </div>
                {menuLeftContent}
                {menuRightContent}
            </header>
        );
    }
}

export default Navigator;
