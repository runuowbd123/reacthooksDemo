import * as React from 'react';

import { Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import { UserService } from '../api';

import Background from '../components/background';

const FormItem = Form.Item;

export interface LoginProps extends FormComponentProps {
    data: object;
}

interface LoginState {
    imgSrc: string;
}

class Login extends React.Component<LoginProps, LoginState> {

    public state: LoginState = {
        imgSrc: '',
    };

    public submit = (e: React.MouseEvent) => {
        e.preventDefault();
        const { form } = this.props;
        console.log('form', form);
        form.validateFields(async (err, user) => {
            if (!err) {
               const res = UserService.login(user);
               if (res) {
                   console.log('login res:', res);
               }
            }
        });
    }

    public refreshImg = () => {
        this.setState({
            imgSrc: '' + Math.random(),
        });
    }

    public render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Background>
                <div className="login-box">
                    <p className="login-title"> 义乌恒风登录 </p>
                    <Form onSubmit={this.submit} autoComplete="off">
                        <FormItem
                        >
                            {
                                getFieldDecorator('username', {
                                    rules: [
                                        { type: 'email', message: '用户名为邮箱' },
                                        { required: true, message: '请填写用户名' },
                                    ],
                                })(
                                    <Input
                                        autoComplete="disabled"
                                        style={{ width: 320, height: 40 }}
                                        placeholder={'请输入用户名'}
                                    />,
                                )
                            }
                        </FormItem>
                        <FormItem
                        >
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        { required: true, message: '请填写密码' },
                                    ],
                                })(
                                    <Input
                                        autoComplete="disabled"
                                        type="password"
                                        style={{ width: 320, height: 40 }}
                                        placeholder={'请输入密码'}
                                    />,
                                )
                            }
                        </FormItem>

                        <FormItem
                        >
                            {
                                getFieldDecorator('verify_code', {
                                    rules: [
                                        { required: true, message: '请输入验证码' },
                                    ],
                                })(
                                    <div className="valid-code-box">
                                        <Input style={{ width: 210, height: 40 }} placeholder={'请输入验证码'} />
                                        <img
                                            className="code_img pull-right"
                                            onClick={this.refreshImg}
                                            id="v_code"
                                            src={`/uic/api/v2/account/login/gen-captcha?r=` + this.state.imgSrc}
                                            title={'验证码'}
                                            alt={'验证码'}
                                        />
                                    </div>,
                                )
                            }
                        </FormItem>
                        <Button
                            className="login-btn"
                            htmlType="submit"
                            type="primary"
                        >
                                登录
                        </Button>
                    </Form>
                </div>
            </Background>
        );
    }
}
const LoginWrapper = Form.create()(Login);

export default LoginWrapper;
