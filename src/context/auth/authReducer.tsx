
export enum AuthStatus {
    CHECKING = 'checking',
    AUTHENTICATED = 'authenticated',
    NOT_AUTHENTICATED = 'not-authenticated',
}

export interface AuthState {
    user: any | null;
    token: string | null ;
    status: AuthStatus,
    errorMessage: string | null,
}

type AuthAction = 
    | { type: 'login', payload: { user: any, token: string } }
    | { type: 'set_error', payload: string }

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
        case 'set_error':
            return {
                ...state,
                errorMessage: action.payload,
                status: AuthStatus.NOT_AUTHENTICATED,
            }
        default:
            return state;
    }
}