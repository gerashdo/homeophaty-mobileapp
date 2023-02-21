import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { createContext, useReducer } from "react";
import homeophatyAPI from "../../api/homeophatyAPI";
import { LoginErrorResponseLong, LoginErrorResponseShort, LoginResponse } from '../../interfaces/auth';
import { authReducer, AuthState, AuthStatus } from "./authReducer";

interface AuthContextProps {
    state: AuthState,
    login: ( username: string, password: string ) => void
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
    
    // const renovateToken = async() => {
    //     const token = AsyncStorage.getItem('token')
    //     if( !token ) return

    //     const { data } = await homeophatyAPI.get('/auth/renovate')
    // }

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
            if( axios.isAxiosError( error )){
                if( error.response?.data.msg ){
                    const data: LoginErrorResponseShort = error.response?.data
                    dispatch({ type: 'set_error', payload: data.msg })
                }else{
                    const data: LoginErrorResponseLong = error.response?.data
                    const msg = Object.values( data.errors )[0].msg
                    dispatch({ type: 'set_error', payload: msg })
                }
            }else{
                dispatch({ type: 'set_error', payload: 'No se pudo iniciar sesión' })
            }
        }
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