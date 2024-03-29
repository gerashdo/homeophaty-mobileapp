import { createContext, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { LoginResponse } from '../../interfaces/auth';
import { authReducer, AuthState, AuthStatus } from "./authReducer";
import homeophatyAPI from "../../api/homeophatyAPI";
import { ErrorResponseLong, ErrorResponseShort } from "../../interfaces/requestErrors";
import { getUncertainAxiosErrorMessage } from "../../helpers/getUncertainErrorMessage";

interface AuthContextProps {
    state: AuthState,
    login: ( username: string, password: string ) => void;
    logout: () => void;
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
    useEffect(() => {
      checkToken()
    }, [])

    const setError = ( error: string ) => {
        dispatch({ type: 'set_error', payload: error })
        setTimeout(() => {
            dispatch({ type: 'remove_error' })
        }, 8000);
    }
    
    const checkToken = async() => {
        try {
            const { data } = await homeophatyAPI.get<LoginResponse>('/auth/renovate')
            dispatch({ type: 'login', payload:{
                user: data.user,
                token: data.token
            }})
            AsyncStorage.setItem( 'token', data.token )
        } catch (error) {
            dispatch({ type: 'logout' })
        }
    }

    const login = async( username: string, password: string ) => {
        try {
            const { data } = await homeophatyAPI.post<LoginResponse>('/auth/login',{
                username,
                password
            })
            dispatch({ type: 'login', payload: {
                user: data.user,
                token: data.token,
            }})

            AsyncStorage.setItem( 'token', data.token )

        } catch (error: any ) {
            setError( getUncertainAxiosErrorMessage( error, 'No se pudo iniciar sesión' ) )
        }
    }

    const logout = () => {
        dispatch({ type: 'logout' })
        AsyncStorage.removeItem( 'token' )
    }

    return(
        <AuthContext.Provider value={{
            state,
            login,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}