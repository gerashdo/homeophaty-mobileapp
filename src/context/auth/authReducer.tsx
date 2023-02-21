
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
        default:
            return state;
    }
}