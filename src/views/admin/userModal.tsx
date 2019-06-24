import * as React from 'react';

import { Modal } from 'antd';

import { User } from '../../model';
import UserForm from './form';

import { FORM_MODE } from '../../comm/consts';

interface UserModalProps {
    user: User;
    visible: boolean;
    title: string;
    mode: FORM_MODE | null;
    onOk(user: User): void;
    onCancel(): void;
}

class UserModal extends React.Component<UserModalProps> {

    public formInstance: any;

    public submit = () => {
        const form = this.formInstance.props.form;
        const { onOk } = this.props;
        form.validateFields(async (err: Error, values: User) => {
            if (!err) {
                onOk(values);
            }
        });
    }

    public render() {
        const { title, visible, onOk, onCancel, user } = this.props;
        return (
            <Modal
                visible={visible}
                title={title}
                okText="确认"
                cancelText="取消"
                onOk={this.submit}
                onCancel={onCancel}
            >
                <UserForm
                    user={user}
                    // tslint:disable-next-line:jsx-no-lambda
                    wrappedComponentRef={(e: any) => { this.formInstance = e; }}
                />
            </Modal>
        );
    }
}

export default UserModal;
