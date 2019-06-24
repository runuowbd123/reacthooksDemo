import * as React from 'react';

import UserService from '../api/user';
import { User } from '../model';
import utils from '../utils';

interface UserState {
    user: User;
    updateUser?(user: User): void;
    loadUser?(user: User): void;
}

const initialState: UserState = {
    user: {},
};

const UserCtx = React.createContext(initialState);

export class UserProvider extends React.Component {

    public state: User = {
        userName: 'test',
    };

    public componentDidMount() {
        this.loadUser({
            id: utils.getCookie('uid'),
        });
    }

    public updateUser = (user: User): void => {
        this.setState({
            ...this.state,
            ...user,
        });
    }

    public loadUser = async (user: User) => {
        const res = await UserService.getUserInfo(user);
        if (res.data) {
            this.setState({
                ...res.data,
            });
        }
    }

    public getValue(): UserState {
        const { updateUser, state, loadUser} = this;
        return {
            loadUser,
            updateUser,
            user: state,
        };
    }

    public render() {
        return (
            <UserCtx.Provider
                value={this.getValue()}
            >
                {this.props.children};
            </UserCtx.Provider>
        );
    }
}
export default UserCtx;
