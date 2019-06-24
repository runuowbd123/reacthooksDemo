import * as React from 'react';

import { Button, Form, message, Modal } from 'antd';

import { UserService } from '../../api';
import { User } from '../../model';
import UserBinding from './binding';

interface BindigProps {
    user: User;
    visible: boolean;
    onCancel(): void;
    onOk(res?: any): void;
}

class BindingModal extends React.Component<BindigProps> {
    public formInstance: any;

    public bindUser = () => {
        const { onOk } = this.props;
        const form = this.formInstance.props.form;
        form.validateFields(async (err: Error, values: User) => {
            if (!err) {
                const res = await UserService.bindUser(values);
                if (res) {
                    message.success('绑定成功！');
                    onOk(res);
                } else {
                    message.error('绑定失败！');
                }
            }
        });
    }

    public unBindUser = () => {
        const { onOk } = this.props;
        const form = this.formInstance.props.form;
        form.validateFields(async (err: Error, values: User) => {
            if (!err) {
                const res = await UserService.bindUser(values);
                if (res) {
                    message.success('绑定成功！');
                    onOk(res);
                } else {
                    message.error('绑定失败！');
                }
            }
        });
    }

    public renderFooter = () => {
        const { onCancel } = this.props;
        return (
            <div>
                <Button onClick={onCancel}>取消</Button>
                <Button type="primary" onClick={this.bindUser}>确定</Button>
                <Button type="danger" onClick={this.unBindUser}>解除绑定</Button>
            </div>
        );
    }

    public render() {
        const { visible, user } = this.props;

        return (
            <Modal
                visible={visible}
                title="账号绑定"
                okText="确认"
                cancelText="取消"
                footer={this.renderFooter()}
            >
                <UserBinding
                    user={user}
                    // tslint:disable-next-line:jsx-no-lambda
                    wrappedComponentRef={(e: any): any => { this.formInstance = e; }}
                />
            </Modal>
        );
    }
}

export default BindingModal;
