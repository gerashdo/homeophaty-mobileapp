import { createContext, useReducer } from "react";
import { authReducer, AuthState, AuthStatus } from "./AuthReducer";

interface AuthContextProps {
    state: AuthState,
    login: () => void
}

export const AuthContext = createContext({} as AuthContextProps )

interface Props {
    children: JSX.Element | JSX.Element[];
}

const initialState: AuthState = {
    user: null,
    token: null,
    errorMessage: '',
    status: AuthStatus.CHECKING
}

export const AuthProvider = ({ children }:Props) => {

    const [ state, dispatch ] = useReducer( authReducer, initialState )

    const login = () => {
        
    }

    return(
        <AuthContext.Provider value={{
            state,
            login
        }}>
            { children }
        </AuthContext.Provider>
    )
}