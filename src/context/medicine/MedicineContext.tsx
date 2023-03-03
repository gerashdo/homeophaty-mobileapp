import { createContext, useReducer, useState } from "react";

import homeophatyAPI from "../../api/homeophatyAPI";
import { getUncertainAxiosErrorMessage } from "../../helpers/getUncertainErrorMessage";
import { useForm } from "../../hooks/useForm";
import { HighOrderComponent } from '../../interfaces/common';
import { MedicinePostRequest, MedicinePostResponse, MedicinesResponse, MedicineType, NewPrescriptionRequest, NewPrescriptionResponse } from "../../interfaces/medicine";
import { medicineReducer, MedicineState } from "./medicineReducer";

interface NewMedicineState {
    medicineData: MedicinePostRequest,
    onChange: <K extends keyof MedicinePostRequest>(value: MedicinePostRequest[K], field: K) => void;
}
interface MedicineContextProps {
    medicineState: MedicineState;
    isLoading: boolean;
    newMedicineState: NewMedicineState;
    chOptions: string[];
    loadMedicines: () => void;
    createMedicine: () => void;
    setActiveMedicine: ( medicineId: string ) => void;
    createPrescription: ( medicineId: string, prescription: NewPrescriptionRequest ) => void;
}

export const MedicineContext = createContext({} as MedicineContextProps )

const initialState: MedicineState = {
    medicines: [],
    totalMedicines: 0,
    totalPages: 1,
    currentPage: '1',
    errorMessage: null,
    activeMedicine: null,
}

export const MedicineProvider = ({ children }:HighOrderComponent) => {
    const chOptions = [ "6", "30", "200", "100" ]

    const [ isLoading, setIsLoading ] = useState( false )
    const [ medicineState, dispatch ] = useReducer( medicineReducer, initialState )
    const { onChange, form: medicineData, resetValues } = useForm<MedicinePostRequest>({
        name: '',
        type: MedicineType.MEDICINE,
        ch: chOptions[0],
        medicines:[]
    })
    const newMedicineState = {
        medicineData,
        onChange,
    }

    const setError = ( error: string ) => {
        dispatch({ type: 'set_error', payload: error })
        setTimeout(() => {
            dispatch({ type: 'remove_error' })
        }, 8000);
    }

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
            // TODO: verify this
            setError( 'No fue posible cargar los medicamentos' )
        }
        setIsLoading( false )
    }

    const createMedicine = async() => {
        try {
            const { data } = await homeophatyAPI.post<MedicinePostResponse>('/medicine', medicineData )
            dispatch({ type: 'create_medicine', payload: data.medicine })
            resetValues()
        } catch (error) {
            setError( getUncertainAxiosErrorMessage( 
                error, 
                'No se pudo guardar el medicamento'
            ))
        }
    }

    const setActiveMedicine = ( medicineId: string ) => {
        dispatch({ type: 'set_active_medicine', payload: medicineId })
    }

    const createPrescription = async( medicineId: string, prescription: NewPrescriptionRequest ) => {
        try {
            const { data } = await homeophatyAPI.post<NewPrescriptionResponse>(
                `/medicine/${ medicineId }/prescriptions`, 
                prescription 
            )
            dispatch({ type: 'create_prescription', payload: data.medicine })
        } catch (error) {
            setError( getUncertainAxiosErrorMessage( 
                error, 
                'No se pudo guardar la prescripción'
            ))
        }
    }

    return (
        <MedicineContext.Provider value={{
            isLoading,
            medicineState,
            newMedicineState,
            chOptions,
            loadMedicines,
            createMedicine,
            setActiveMedicine,
            createPrescription
        }}>
            { children }
        </MedicineContext.Provider>
    )
}