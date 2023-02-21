import { User } from "../../interfaces/auth";

export enum AuthStatus {
    CHECKING = 'checking',
    AUTHENTICATED = 'authenticated',
    NOT_AUTHENTICATED = 'not-authenticated',
}

export interface AuthState {
    user: User | null;
    token: string | null ;
    status: AuthStatus,
    errorMessage: string | null,
}

type AuthAction = 
    | { type: 'login', payload: { user: User, token: string } }
    | { type: 'logout' }
    | { type: 'set_error', payload: string }
    | { type: 'remove_error' }

export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {
    switch ( action.type ) {
        case 'login':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                errorMessage: null,
                status: AuthStatus.AUTHENTICATED
            }
        case 'logout':
            return {
                ...state,
                errorMessage: null,
                status: AuthStatus.NOT_AUTHENTICATED,
                user: null,
                token: null,
            }
        case 'set_error':
            return {
                ...state,
                errorMessage: action.payload,
                status: AuthStatus.NOT_AUTHENTICATED,
            }
        case 'remove_error':
            return {
                ...state,
                errorMessage: null,
            }
        default:
            return state;
    }
}