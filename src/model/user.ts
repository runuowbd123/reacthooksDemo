export interface UserRole {
    id?: number;
    name?: string;
    roleValue?: number;
}

export default interface User {
    id?: number | string;
    userName?: string;
    password?: string;
    alias?: string;
    email?: string;
    phoneNumber?: string;
    role?: UserRole[];
    joinTime?: number | Date;
    mark?: string;
}
