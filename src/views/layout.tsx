import * as React from 'react';

import { ClickParam } from 'antd/lib/menu';

import Navigator from '../components/nav';

import { UserService } from '../api';
import ModalCtx from '../context/modal';
import ResetPwdModal from './resetPwd';

const menuItems = [{
    enable: true,
    id: 'receipts',
    link: `#/receipts`,
    name: '填报管理',
}, {
    enable: true,
    id: 'admin',
    link: `#/admin`,
    name: '账号管理',
}];

const settingMenus = [{
    enable: true,
    id: 'resetPwd',
    link: `javascript:void(0);`,
    name: '修改密码',
}];

const logo = (
    <React.Fragment>
        <img
            className="c-header__logo c-header__logo--console"
            alt="logo"
            src={'/public/img/logo.svg'}
        />
        <span className="c-header__title c-header__title--console">
            填报系统
        </span>
    </React.Fragment>
);

const Layout: React.SFC = (props) => {

    const modalCtx = React.useContext(ModalCtx);

    const onClickSettingMenu = (pm: ClickParam) => {
        const action = pm.key;
        if (action === 'logout') {
            UserService.logout();
        } else if (action === 'resetPwd') {
            console.log('reset pwd:', modalCtx);
            modalCtx.showResetModal();
        }
    };

    return (
        <div className="main">
            <Navigator
                logo={logo}
                menuItems={menuItems}
                settingMenus={settingMenus}
                onClickRightMenu={onClickSettingMenu}
            />
            <div className="container">
                <div className="content">
                    {props.children}
                </div>
            </div>
            <ResetPwdModal />
        </div>
    );
};

export default Layout;
