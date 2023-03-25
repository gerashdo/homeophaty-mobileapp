import { useEffect, useState } from "react"
import { Medicine } from "../interfaces/medicine"
import { useBoundStore } from "../store/useBoundStore"
import { useSearch } from "./useMedicines"


export const useMedicinesSearch = () => {

    const { medicines: medicinesFromStore } = useBoundStore()
    const [ searchTermn, setSearchTermn ] = useState<string>('')
    const { searchQuery } = useSearch( searchTermn, 'medicines' )

    const [ medicines, setMedicines ] = useState<Medicine[]>( medicinesFromStore )
    
    useEffect(() => {
      if( searchTermn ){
        setMedicines( searchQuery.data?.result || [] )
      }else{
        setMedicines( medicinesFromStore )
      }
    }, [ medicinesFromStore, searchTermn, searchQuery.data ])

    return {
        setSearchTermn,
        searchTermn,
        medicines,
        isLoading: searchQuery.isLoading,
        isError: searchQuery.isError,
    }

}