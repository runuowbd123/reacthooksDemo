import * as React from 'react';

import { Form, Input, message, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import { UserService } from '../api';
import { formItemLayout } from '../comm';
import ModalCtx, { MODAL_TYPE } from '../context/modal';
import { User } from '../model';

const FormItem = Form.Item;

class ResetPwdModal extends React.Component<FormComponentProps> {

    public state = {
        confirmDirty: false,
    };

    public submit = () => {
        const form = this.props.form;

        form.validateFields(async (err: Error, values: User) => {
            if (!err) {
                const res = UserService.resetPassword(values);
                if (res) {
                    message.success('重置密码成功！');
                    this.onCancel();
                }
            }
        });
    }

    public onCancel = () => {
        const modal = this.context;
        modal.reset();
    }

    public validateToNextPassword = (rule: any, value: any, callback: any) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    public compareToPassword = (rule: any, value: any, callback: any) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('确认密码与新密码不一致!');
        } else {
            callback();
        }
    }

    public handleConfirmBlur = (e: any) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    public render() {
        const { form } = this.props;
        const modal = this.context;
        const getFieldDecorator = form.getFieldDecorator;
        const visible = modal.visible === MODAL_TYPE.RESET_PWD_MODAL;

        return (
            <Modal
                okText="确认"
                cancelText="取消"
                onOk={this.submit}
                visible={visible}
                onCancel={this.onCancel}
                title="修改统一身份认证密码"
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="旧密码"
                        hasFeedback={true}
                    >
                        {getFieldDecorator('oldPassword', {
                            rules: [{
                                message: '旧密码不可为空！',
                                required: true,
                            }],
                        })(
                            <Input type="password" placeholder="输入旧密码" />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="新密码"
                        hasFeedback={true}
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                message: '密码不可为空！',
                                required: true,
                            }, {
                                message: '密码需由不少于6位的数字、大写和小写字母组成！',
                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+){6,}$/,
                            }],
                        })(
                            <Input type="password" placeholder="输入新密码" />,
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认密码"
                        hasFeedback={true}
                    >
                        {getFieldDecorator('confirmPassword', {
                            rules: [{
                                message: '确认密码不可为空！',
                                required: true,
                            }, {
                                validator: this.compareToPassword,
                            }],
                        })(
                            <Input
                                type="password"
                                placeholder="再次输入新密码"
                                onBlur={this.handleConfirmBlur}
                            />,
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

ResetPwdModal.contextType = ModalCtx;

const FormWrapper = Form.create()(ResetPwdModal);

export default FormWrapper;
