import { UserRole } from '../model';
import { APP_ROLES } from './consts';

export const formItemLayout = { // 表单常用布局
    labelCol: {
        sm: { span: 6 },
        xs: { span: 24 },
    },
    wrapperCol: {
        sm: { span: 14 },
        xs: { span: 24 },
    },
};

export const halfFormItemLayout = { // 表单中间布局
    labelCol: {
        sm: { span: 7 },
        xs: { span: 24 },
    },
    wrapperCol: {
        sm: { span: 10 },
        xs: { span: 24 },
    },
};

export const tailFormItemLayout = { // 表单末尾布局
    wrapperCol: {
        sm: {
            offset: 6,
            span: 14,
        },
        xs: {
            offset: 0,
            span: 24,
        },
    },
};

export const userRoles: UserRole[] = [
    {
        id: 1,
        name: '管理员',
        roleValue: APP_ROLES.Admin,
    },
    {
        id: 2,
        name: '填报员',
        roleValue: APP_ROLES.Operator,
    },
];
