import { createContext, useReducer, useState } from "react";

import homeophatyAPI from "../../api/homeophatyAPI";
import { HighOrderComponent } from '../../interfaces/common';
import { MedicinesResponse } from "../../interfaces/medicine";
import { medicineReducer, MedicineState } from "./medicineReducer";

interface MedicineContextProps {
    medicineState: MedicineState;
    loadMedicines: () => void;
    isLoading: boolean;
}

export const MedicineContext = createContext({} as MedicineContextProps )

const initialState: MedicineState = {
    medicines: [],
    totalMedicines: 0,
    totalPages: 1,
    currentPage: '1',
    errorMessage: null,
}

export const MedicineProvider = ({ children }:HighOrderComponent) => {

    const [ isLoading, setIsLoading ] = useState( false )
    const [ medicineState, dispatch ] = useReducer( medicineReducer, initialState )

    const loadMedicines = async() => {
        try {
            setIsLoading( true )
            const { data } = await homeophatyAPI.get<MedicinesResponse>('/medicine')
            const { medicines, totalMedicines, page, totalPages } = data
            dispatch({ type: 'load_medicines', payload: {
                medicines,
                totalMedicines,
                totalPages,
                currentPage: page,
            }})
        } catch (error) {
            setError( 'No fue posible cargar los medicamentos' )
        }
        setIsLoading( false )
    }

    const setError = ( error: string ) => {
        dispatch({ type: 'set_error', payload: error })
        setTimeout(() => {
            dispatch({ type: 'remove_error' })
        }, 8000);
    }

    return (
        <MedicineContext.Provider value={{
            isLoading,
            medicineState,
            loadMedicines,
        }}>
            { children }
        </MedicineContext.Provider>
    )
}