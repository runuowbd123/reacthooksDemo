import * as React from 'react';

import { Button, Icon, Menu } from 'antd';
import * as _ from 'lodash';
import { Link, Route, Switch } from 'react-router-dom';
import { ReceiptService } from '../../api';
import { GetHistory } from '../../model';
import Layout from '../layout';
import Content from './content';
import menuKeyList from './menuKeyList';

const { SubMenu }  = Menu;

interface State {
    openKeys: any[]; // 展开的menu
    selectKey: any[]; // 选中的menukey
    menuList: any[]; // menu列表
    selectName: string; // menu选中的名字
    nullArr: any[]; // 空数组
    file: any; // 上传的文件
    fileStatus: boolean; // 文件状态
    // filter: any; // 筛选数组
    // sorter: any; // 排序对象
    current: number; // 当前第几页
    pageSize: number; // 每页多少条
    total: number; // 总共有多少条表格数据
    tableList: any[]; // 表格数据
}

class Receipts extends React.Component<any, State> {
    public state: State = {
        current: 1,
        file: null,
        fileStatus: false,
        menuList: [],
        nullArr: [],
        openKeys: [],
        pageSize: 10,
        selectKey: [],
        selectName: '',
        // filter: null,
        // sorter: null,
        tableList: [],
        total: 0,
    };
    constructor(props: any) {
        super(props);
    }

    public componentDidMount() {
        this.getMenuListAndTableList();
    }

    public getMenuListAndTableList = async () => {
        const menuList = [
            {
                children: [
                    {
                        icon: '',
                        key: 'situation',
                        name: '客运情况',
                    },
                    {
                        icon: '',
                        key: 'detail',
                        name: '运营明细',
                    },
                    {
                        icon: '',
                        key: 'summary',
                        name: '月报表车辆单位汇总',
                    },
                ],
                icon: 'home',
                key: 'transport',
                name: '客运',
            },
            {
                children: [
                    {
                        icon: '',
                        key: 'carData',
                        name: '车辆',
                    },
                    {
                        icon: '',
                        key: 'lineData',
                        name: '线路',
                    },
                    {
                        icon: '',
                        key: 'siteNum',
                        name: '站点、首末站数',
                    },
                    {
                        icon: '',
                        key: 'passenger',
                        name: '客流',
                    },
                    {
                        icon: '',
                        key: 'supporting',
                        name: '充电桩、加气站等配套设施',
                    },
                ],
                icon: 'car',
                key: 'bus',
                name: '公交',
            },
            {
                children: [
                    {
                        icon: '',
                        key: 'dataSummary',
                        name: '数据汇总',
                    },
                    {
                        icon: '',
                        key: 'busNoCash',
                        name: '公交非现金营收汇总',
                    },
                    {
                        icon: '',
                        key: 'historyData',
                        name: '历史数据',
                    },
                    {
                        icon: '',
                        key: 'networkCarData',
                        name: '网约车日报表',
                    },
                ],
                icon: 'bar-chart',
                key: 'hengfengxing',
                name: '恒风行',
            },
            {
                children: [
                    {
                        icon: '',
                        key: 'profitSheet',
                        name: '利润表',
                    },
                    {
                        icon: '',
                        key: 'balanceSheet',
                        name: '资产负债表',
                    },
                    {
                        icon: '',
                        key: 'cashFlowsSheet',
                        name: '现金流量表',
                    },
                    {
                        icon: '',
                        key: 'manageCostSheet',
                        name: '管理费用表',
                    },
                ],
                icon: 'dollar-circle',
                key: 'finance',
                name: '财务',
            },
        ];
        const pathnameArr = this.props.location.pathname.split('/');
        const targetKey = pathnameArr.length > 2 ? pathnameArr[pathnameArr.length - 1] : false;
        console.log(targetKey);
        const selectKey = targetKey
                            ? targetKey
                            : (
                                menuList.length > 0
                                    ? (
                                        menuList[0].children && menuList[0].children.length > 0
                                            ? (menuList[0].children)[0].key
                                            : menuList[0].key
                                    )
                                    : ''
                            );
        let openKeys = '';
        let selectName = '';
        _.forEach(menuList, (item) => {
            if (item.key === selectKey) {
                openKeys = item.key;
            }
            _.forEach(item.children, (child) => {
                if (child.key === selectKey) {
                    openKeys = item.key;
                    selectName = child.name;
                }
            });
        });
        this.setState({
            menuList,
            openKeys: [openKeys],
            selectKey: [selectKey],
            selectName,
        });
        const param: GetHistory = {
            asc: false,
            orderField: 'gmtCreate',
            page: this.state.current,
            size: this.state.pageSize,
            templateType: menuKeyList[selectKey],
        };
        const res = await ReceiptService.getHistory(param);
        console.log(res);
        this.setState({
            total: 14,
            // tslint:disable-next-line:object-literal-sort-keys
            tableList: [
                {fileName: 'ddsa', gmtCreate: '2019-02-14', id: 111},
                {fileName: '222dd', gmtCreate: '2019-02-15', id: 22},
                {fileName: '33', gmtCreate: '2019-02-15', id: 3},
                {fileName: '44', gmtCreate: '2019-02-15', id: 4},
            ],
        });
        this.props.history.push({
            pathname: `/receipts/${selectKey}`,
        });
    }

    public changeMenuItem = async (key: any, name: any) => {
        // 选择同样menu的时候不变化
        if (key === this.state.selectKey[0]) {
            return ;
        }
        this.setState({
            current: 1,
            file: null,
            fileStatus: false,
            selectKey: [key],
            selectName: name,
            total: 0,
        });
        const param: GetHistory = {
            asc: false,
            orderField: 'gmtCreate',
            page: this.state.current,
            size: this.state.pageSize,
            templateType: menuKeyList[key],
        };
        const res = await ReceiptService.getHistory(param);
        console.log(res);
        this.setState({
            total: 14,
            // tslint:disable-next-line:object-literal-sort-keys
            tableList: [
                {fileName: 'ddsa', gmtCreate: '2019-02-14', id: 111},
                {fileName: '222dd', gmtCreate: '2019-02-15', id: 22},
            ],
        });
        this.props.history.push({
            pathname: `/receipts/${key}`,
        });
    }

    public changeState = (newState: any) => {
        this.setState(newState);
    }

    public render() {
        const {menuList, selectKey} = this.state;
        const MenuList = _.map(menuList, (item) => {
            return (
                <SubMenu
                    key={item.key}
                    title={(
                        <div>
                            <Icon
                                type={item.icon}
                                theme={item.key === 'hengfengxing' ? null : 'filled'}
                                style={{
                                    fontSize: '14px',
                                }}
                            />
                            {item.name}
                        </div>
                    )}
                >
                    {
                        _.map(item.children, (childItem) => {
                            return (
                                <Menu.Item key={childItem.key}>
                                    <div
                                        // tslint:disable-next-line:jsx-no-lambda
                                        onClick={() => {
                                            this.changeMenuItem(childItem.key, childItem.name);
                                        }}
                                    >
                                        {childItem.name}
                                    </div>
                                </Menu.Item>
                            );
                        })
                    }
                </SubMenu>
            );
        });

        // console.log(this.props, this.state);
        return (
            <Layout>
                <div
                    className="card"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flex: 1,
                        }}
                    >
                        <div
                            style={{
                                background: '#fff',
                                borderRight: '1px solid #ddd',
                                overflow: 'hidden',
                                width: '230px',
                            }}
                        >
                            <Menu
                                mode="inline"
                                openKeys={this.state.openKeys}
                                // tslint:disable-next-line:jsx-no-lambda
                                onOpenChange={(e) => this.setState({ openKeys: e })}
                                selectedKeys={this.state.selectKey}
                                style={{ width: 230 }}
                            >
                                {MenuList}
                            </Menu>
                        </div>
                        {/* <Route
                            path={`/receipts/content/:roleId`}
                            // tslint:disable-next-line:jsx-no-lambda
                            component={() => {
                                return (
                                    <Content
                                        dataContext={this.state}
                                        setNewState={this.changeState}
                                    />
                                );
                            }}
                        /> */}
                        <Content
                            dataContext={this.state}
                            setNewState={this.changeState}
                        />
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Receipts;
