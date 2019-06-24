import * as React from 'react';

import { Button, Card, Dropdown, Icon, Input, Menu, message, Modal, Table } from 'antd';

import { ClickParam } from 'antd/lib/menu';
import { UserService } from '../../api';
import { FORM_MODE } from '../../comm/consts';
import { QueryParams, User } from '../../model';
import utils from '../../utils';
import Layout from '../layout';

import BindingModal from './bindingModal';
import UserModal from './userModal';

const Search = Input.Search;

export interface AdminProps {
    data: object;
    user: User;
}

interface AdminState {
    visible: boolean;
    visibleBinding: boolean;
    formMode: FORM_MODE;
    data: User[];
    targetUser: User;
    loading: boolean;
    queryParams: QueryParams;
}

const mockData: User[] = Array(20).fill('d').map((_: any, i: number) => {
    return {
        email: 'xiaowei@dtstack.com',
        id: i,
        joinTime: new Date(),
        phoneNumber: '123456789102',
        userName: `test-${i}`,
    };
});

const initialState: AdminState = {
    data: [],
    formMode: null,
    loading: false,
    queryParams: {
        currentPage: 1,
        limit: 10,
    },
    targetUser: null,
    visible: false,
    visibleBinding: false,
};

class UserAdmin extends React.Component<AdminProps, AdminState> {

    public state: AdminState = initialState;

    public componentDidMount() {
        this.fetch();
    }

    public fetch = async (params?: QueryParams) => {
        const reqParams: QueryParams = { ...this.state.queryParams, ...params };
        const res = await UserService.getUsers(reqParams);
        if (res.code === 1) {
            this.setState({
                data: res.data,
            });
        }
    }

    public updateUser = async (user: User) => {
        const { formMode } = this.state;
        let msgPrefix = '添加';
        let res = null;
        if (formMode === FORM_MODE.EDIT) {
            msgPrefix = '更新';
            res = await UserService.update(user);
        } else {
            res = await UserService.create(user);
        }

        if (res && res.code === 1) {
            message.success(`${msgPrefix}用户成功`);
            this.fetch();
        } else {
            message.success(`${msgPrefix}用户失败`);
        }
    }

    public delete =  (user: User) => {
        console.log('delete', user);
        Modal.confirm({
            cancelText: '取消',
            content: (
                <p>
                    删除后，此用户无法登录填报系统，也无法通过填报系统登录其他系统！
                </p>
            ),
            okText: '确认',
            okType: 'danger',
            onOk: async () => {
                const res = await UserService.delete(user);
                if (res.code === 1) {
                    message.success('删除用户成功');
                    this.fetch();
                } else {
                    message.error('删除用户失败！');
                }
            },
            onCancel() {
                console.log('Cancel');
            },
            title: '删除账户',
        });
    }

    public resetPwd = (user: User) => {
        const reset = async () => {
            const res = await UserService.resetPassword(user);
            if (res.code === 1) {
                Modal.success({
                    content: (
                        <div>
                        <p>账户${user.userName}的密码重置成功，新密码：</p>
                        <p><b>aaaaa</b></p>
                      </div>
                    ),
                    title: '重置密码成功',
                  });
            } else {
                message.error('重置密码成功失败');
            }
        };

        Modal.confirm({
            cancelText: '取消',
            content: (
                <div>
                <p>注意：账户${user.userName}的密码将被重置!</p>
              </div>
            ),
            okText: '重置',
            okType: 'danger',
            title: '重置密码',
            onOk() {
                reset();
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }

    public handleMenuClick = (params: ClickParam) => {
        console.log('handleMenuClick ', params);
        const user = params.item.props['data-item'];
        switch (params.key) {
            case 'alterUser': {
                this.setState({
                    formMode: FORM_MODE.EDIT,
                    targetUser: user,
                    visible: true,
                });
                break;
            }
            case 'deleteUser': {
                this.delete(user);
                break;
            }
            case 'bindAccount': {
                this.setState({
                    targetUser: user,
                    visibleBinding: true,
                });
                break;
            }
            case 'resetPwd': {
                this.resetPwd(user);
                break;
            }
            default:
                break;
        }
    }

    public onSearch = (value: string) => {
        this.fetch({ query: value });
    }

    public onParamsChange = (propName: string, value: string | number) => {
        this.setState({
            queryParams: {
                ...this.state.queryParams,
                [propName]: value,
            },
        });
    }

    public triggerCreate = () => {
        this.setState({
            formMode: FORM_MODE.CREATE,
            visible: true,
        });
    }

    public triggerEdit = () => {
        this.setState({
            formMode: FORM_MODE.EDIT,
            visible: true,
        });
    }

    public handleTableChange = (pagination: any) => {
        this.onParamsChange('currentPage', pagination.current);
    }

    public onCancel = () => {
        this.setState({
            formMode: null,
            visible: false,
            visibleBinding: false,
        });
    }

    public render() {
        const {
            queryParams, loading,
            data, visible, formMode,
            visibleBinding, targetUser,
        } = this.state;

        const { user } = this.props;

        const extra = (
            <Button
                type="primary"
                onClick={this.triggerCreate}
            >
                添加账号
            </Button>
        );

        const title = (
            <span>
                <Search
                    placeholder="请输入要搜索的账号"
                    value={queryParams.query}
                    onChange={this.onParamsChange.bind('query')}
                    style={{ width: 200 }}
                    onSearch={this.onSearch}
                />
            </span>
        );

        const pagination = {
            current: queryParams.currentPage,
            defaultPageSize: 10,
            total: queryParams.total,
        };

        return (
            <Layout>
                <div className="card yw-card">
                    <Card
                        bordered={false}
                        hoverable={false}
                        title={title}
                        extra={extra}
                    >
                        <Table
                            rowKey="id"
                            className="yw-table"
                            columns={this.initColumns()}
                            onChange={this.handleTableChange}
                            loading={loading}
                            pagination={pagination}
                            dataSource={mockData}  // data
                        />
                    </Card>
                    <UserModal
                        title={formMode === FORM_MODE.CREATE ? '添加账号' : '编辑账号'}
                        mode={formMode}
                        visible={visible}
                        onOk={this.updateUser}
                        onCancel={this.onCancel}
                        user={user}
                    />
                    <BindingModal
                        user={targetUser}
                        onOk={this.fetch}
                        onCancel={this.onCancel}
                        visible={visibleBinding}
                    />
                </div>
            </Layout>
        );
    }

    public renderTableOperation = (id: string, record: User) => {
        const ctx = this;

        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="alterUser" data-item={record}>
                    <Icon type="edit" />
                    编辑
                </Menu.Item>
                <Menu.Item key="deleteUser">
                    <Icon type="delete" />
                    删除
                </Menu.Item>
                <Menu.Item key="bindAccount" data-item={record}>
                    <Icon type="user-add" />
                    账号绑定
                </Menu.Item>
                <Menu.Item key="resetPwd" data-item={record}>
                    <Icon type="key" />
                    重置密码
              </Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">操作 <Icon type="down" /></a>
            </Dropdown>
        );
    }

    public initColumns = () => {

        return [{
            dataIndex: 'userName',
            key: 'userName',
            title: '账号',
        }, {
            dataIndex: 'email',
            key: 'email',
            title: '邮箱',
        }, {
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            title: '手机号',
        }, {
            dataIndex: 'roles',
            key: 'roles',
            title: '角色',
            width: 120,
            render(roles: User[]) {
                const roleNames = roles && roles.map((role: User) => role && role.alias);
                return roleNames && roleNames.join(',');
            },
        }, {
            dataIndex: 'joinTime',
            key: 'joinTime',
            title: '加入时间',
            render(time: string) {
                return utils.formatDateTime(time);
            },
        }, {
            dataIndex: 'id',
            key: 'id',
            render: this.renderTableOperation,
            title: '操作',
            width: 140,
        }];
    }

}

export default UserAdmin;
