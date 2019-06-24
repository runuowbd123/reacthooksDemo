import * as React from 'react';

import { Form, Input } from 'antd';
import { FormComponentProps, WrappedFormInternalProps } from 'antd/lib/form/Form';

import { User, UserRole } from '../../model';

import { formItemLayout } from '../../comm';

interface UserBindingProps extends FormComponentProps {
    user: User;
    myRoles?: UserRole[];

}

const FormItem = Form.Item;

class UserBinding extends React.Component<UserBindingProps> {

    public render() {
        const { form, user } = this.props;
        const getFieldDecorator = form.getFieldDecorator;

        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="填报系统账号"
                >
                    {getFieldDecorator('account', {
                        initialValue: user.userName,
                        rules: [],
                    })(
                        <Input disabled={true} />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="BI系统账号"
                    hasFeedback={true}
                >
                    {getFieldDecorator('bi_account', {
                        rules: [{
                            message: 'BI系统账号不可为空！',
                            required: true,
                        }],
                    })(
                        <Input type="text" />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="BI系统登录密码"
                >
                    {getFieldDecorator('bi_password', {
                        rules: [{
                            message: 'BI系统密码不可为空！',
                            required: true,
                        }],
                    })(
                        <Input
                            type="password"
                        />,
                    )}
                </FormItem>
            </Form>
        );
    }
}
const UserBindingWrapper = Form.create<UserBindingProps>()(UserBinding);

export default UserBindingWrapper;
