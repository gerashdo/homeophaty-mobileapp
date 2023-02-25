import { useState } from "react"

import homeophatyAPI from "../api/homeophatyAPI"
import { getUncertainAxiosErrorMessage } from "../helpers/getUncertainErrorMessage"
import { ResultSearchAllowedTypes, SearchResponse } from "../interfaces/common";


export const useSearch = <T extends keyof ResultSearchAllowedTypes,>( 
    collection: T, 
    initialArray: ResultSearchAllowedTypes[T], 
) => {
    const [ isLoading, setIsLoading ] = useState( false )
    const [ valuesFound, setValuesFound ] = useState<ResultSearchAllowedTypes[T]>( initialArray )
    const [error, setError] = useState('')

    const search = async( termn: string ) => {
        if ( termn.length === 0 ) return
        setIsLoading( true )
        try {
            const { data } = await homeophatyAPI.get<SearchResponse<T>>( `/search/${ String(collection) }/${ termn }` )
            setValuesFound( data.result )
        } catch (error) {
            setError( getUncertainAxiosErrorMessage( error, 'No se pudo realizar la búsqueda' ) )
            setTimeout(() => {
                setError('')
            }, 7500 );
        }
        setIsLoading( false )
    }

    return {
        isLoading,
        valuesFound,
        error,
        search,
    }
}
