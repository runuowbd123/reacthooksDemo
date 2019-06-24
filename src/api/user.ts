import { QueryParams, User } from '../model';

import Http from '../utils/http';

import utils from '../utils';
import localDb from '../utils/localdb';

class UserService {

    public static login(user: User) {
        return Http.post('/user/login', user);
    }

    public static logout() {
        localDb.clear();
        utils.deleteAllCookies('*', '/');
        window.location.href = '/login';
    }
    public static getUserInfo(user: User) {
        return Http.post('/user', user);
    }

    public static getUsers(params?: QueryParams) {
        return Http.post('/user/list', params);
    }

    public static create(user: User) {
        return Http.post('/user/update', user);
    }

    public static update(user: User) {
        return Http.post('/user/update', user);
    }

    public static delete(user: User) {
        return Http.post('/user/delete', user);
    }

    public static resetPassword(user: User) {
        return Http.post('/user/reset', user);
    }

    public static bindUser(user: User) {
        return Http.post('/user/binding', user);
    }
}

export default UserService;
