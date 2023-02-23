import axios from "axios";
import { createContext, useReducer, useState } from "react";

import homeophatyAPI from "../../api/homeophatyAPI";
import { HighOrderComponent } from '../../interfaces/common';
import { MedicinePostRequest, MedicinePostResponse, MedicinesResponse } from "../../interfaces/medicine";
import { ErrorResponseLong, ErrorResponseShort } from "../../interfaces/requestErrors";
import { medicineReducer, MedicineState } from "./medicineReducer";

interface MedicineContextProps {
    medicineState: MedicineState;
    isLoading: boolean;
    loadMedicines: () => void;
    createMedicine: ( medicineData: MedicinePostRequest ) => void;
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

    const createMedicine = async( medicineData: MedicinePostRequest ) => {
        try {
            const { data } = await homeophatyAPI.post<MedicinePostResponse>('/medicine', medicineData )
            dispatch({ type: 'create_medicine', payload: data.medicine })
        } catch (error) {
            if( axios.isAxiosError( error )){
                if( error.response?.data.msg ){
                    const data: ErrorResponseShort = error.response?.data
                    setError( data.msg )
                }else{
                    const data: ErrorResponseLong = error.response?.data
                    const msg = Object.values( data.errors )[0].msg
                    setError( msg )
                }
                console.log( error.response?.data )
            }else{
                setError( 'No se pudo guardar el medicamento' )
            }
        }
    }

    return (
        <MedicineContext.Provider value={{
            isLoading,
            medicineState,
            loadMedicines,
            createMedicine
        }}>
            { children }
        </MedicineContext.Provider>
    )
}