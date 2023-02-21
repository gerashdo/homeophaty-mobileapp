
export interface LoginResponse {
    user:  User;
    token: string;
}

export interface LoginErrorResponseShort {
    msg: string;
}

export interface LoginErrorResponseLong {
    ok:     boolean;
    errors: Errors;
}

export interface Errors {
    username?: Username;
}

export interface Username {
    value:    string;
    msg:      string;
    param:    string;
    location: string;
}


export interface User {
    name:     string;
    email:    string;
    role:     string;
    username: string;
    id:       string;
}
