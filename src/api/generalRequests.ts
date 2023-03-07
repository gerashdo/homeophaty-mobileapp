import { ResultSearchAllowedTypes, SearchResponse } from "../interfaces/common";
import homeophatyAPI from "./homeophatyAPI";


export const search = async<T extends keyof ResultSearchAllowedTypes,>( termn: string, collection: T ) => {
    const { data } = await homeophatyAPI.get<SearchResponse<T>>( `/search/${ String(collection) }/${ termn }` )
    
    return data
}