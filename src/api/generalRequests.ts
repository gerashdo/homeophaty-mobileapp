import { getUncertainAxiosErrorMessage } from "../helpers/getUncertainErrorMessage";
import { ResultSearchAllowedTypes, SearchResponse } from "../interfaces/common";
import homeophatyAPI from "./homeophatyAPI";


export const search = async<T extends keyof ResultSearchAllowedTypes,>( termn: string, collection: T ) => {
    try {
        const { data } = await homeophatyAPI.get<SearchResponse<T>>( `/search/${ String(collection) }/${ termn }` )
        
        return data
    } catch (error) {
        throw new Error( getUncertainAxiosErrorMessage( 
            error, 
            'No se pudo realizar la búsqueda'
        ))  
    }
}