import * as React from 'react';

import { Checkbox, Form, Input, Select } from 'antd';
import { CheckboxOptionType } from 'antd/lib/checkbox';
import { FormComponentProps } from 'antd/lib/form/Form';

import { User, UserRole } from '../../model';

import { formItemLayout, userRoles } from '../../comm';
import { APP_ROLES } from '../../comm/consts';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

// 过滤项目所有者，租户所有者，访客三种无效的授权对象
export const isDisabledRole = (role: UserRole, myRoles: UserRole[]) => {
    return false;
};

interface UserFromProps extends FormComponentProps {
    user: User;
    myRoles?: UserRole[];

}

class UserForm extends React.Component<UserFromProps>  {

    public render() {
        const { form, myRoles } = this.props;
        const getFieldDecorator = form.getFieldDecorator;

        const roleOptions: CheckboxOptionType[]  = [];
        const initialRoleValue = [APP_ROLES.Operator];

        if (userRoles) {
            userRoles.forEach((role) => {
                const disabled = isDisabledRole(role, myRoles);
                roleOptions.push({ label: role.name, value: role.roleValue, disabled });
            });
        }

        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="账号"
                    hasFeedback={true}
                >
                    {getFieldDecorator('targetUserIds', {
                        rules: [{
                            message: '账号不可为空！',
                            required: true,
                        }, {
                            max: 32,
                            message: '账号不可超过32个字符！',
                        }, {
                            message: '账号须由字母开头，且由字母、数字、下划线组成!',
                            pattern: /^([A-Za-z])[A-Za-z0-9_]*$/,
                        }],
                    })(
                        <Input />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
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
                        <Input type="password" />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="角色设置"
                >
                    {getFieldDecorator('roleIds', {
                        initialValue: initialRoleValue,
                        rules: [],
                    })(
                        <CheckboxGroup
                            options={roleOptions}
                        />,
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="备注"
                >
                    {getFieldDecorator('remark', {
                        rules: [
                            {
                                max: 32,
                                message: '不可超过50个字符！',
                            },
                        ],
                    })(
                        <Input.TextArea
                            rows={4}
                            placeholder="不可超过50个字符！"
                        />,
                    )}
                </FormItem>
            </Form>
        );
    }
}

const FormWrapper = Form.create<UserFromProps>()(UserForm);

export default FormWrapper;
