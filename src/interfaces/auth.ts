
export interface LoginResponse {
    user:  User;
    token: string;
}

export interface Username {
    value:    string;
    msg:      string;
    param:    string;
    location: string;
}

export interface UsersResponse {
    total: number;
    users: User[];
}

export interface User {
    name:      string;
    email:     string;
    role:      string;
    username:  string;
    _id:        string;
    password?:  string;
    deleted?:   boolean;
    google?:    boolean;
    updatedAt?: string;
}

