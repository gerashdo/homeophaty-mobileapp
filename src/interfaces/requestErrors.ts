import { Username } from "./auth";

export interface ErrorResponseShort {
    msg: string;
}

export interface ErrorResponseLong {
    ok:     boolean;
    errors: Errors;
}

export interface Errors {
    username?: Username;
}