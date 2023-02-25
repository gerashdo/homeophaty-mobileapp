import axios from "axios"
import { ErrorResponseLong, ErrorResponseShort } from "../interfaces/requestErrors"


export const getUncertainAxiosErrorMessage = ( error: any, defaultMessage: string ): string => {
    
    if( axios.isAxiosError( error )){
        if( !error.response ) return 'Hay problemas con la conexión a internet'

        if( error.response.status === 404 ) return defaultMessage

        if( error.response?.data.msg ){
            const data: ErrorResponseShort = error.response?.data
            return data.msg
        }else{
            const data: ErrorResponseLong = error.response?.data
            return Object.values( data.errors )[0].msg
        }
    }else{
        return defaultMessage
    }
}