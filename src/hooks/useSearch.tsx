import { useState } from "react"
import homeophatyAPI from "../api/homeophatyAPI"
import { getUncertainAxiosErrorMessage } from "../helpers/getUncertainErrorMessage"
import { AllowedCollections, ResultSearchTypes, SearchResponse } from "../interfaces/common"

export const useSearch = ( initialArray: ResultSearchTypes, collection: AllowedCollections ) => {
    const [ isLoading, setIsLoading ] = useState( false )
    const [ valuesFound, setValuesFound ] = useState( initialArray )
    const [error, setError] = useState('')

    const search = async( termn: string ) => {
        setIsLoading( true )
        try {
            const { data } = await homeophatyAPI.get<SearchResponse>( `/search/${ collection }/${ termn }` )
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
