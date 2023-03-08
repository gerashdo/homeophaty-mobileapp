import { createContext, useReducer } from "react";

import { useForm } from "../../hooks/useForm";
import { HighOrderComponent } from '../../interfaces/common';
import { MedicinePostRequest, MedicineType } from "../../interfaces/medicine";
import { medicineReducer, MedicineState } from "./medicineReducer";

interface NewMedicineState {
    medicineData: MedicinePostRequest,
    onChange: <K extends keyof MedicinePostRequest>(value: MedicinePostRequest[K], field: K) => void;
}
interface MedicineContextProps {
    medicineState: MedicineState;
    newMedicineState: NewMedicineState;
    chOptions: string[];
    setNewMedicineFormValues: ( formValues: MedicinePostRequest ) => void;
    resetNewMedicineFormValues: () => void;
}

export const MedicineContext = createContext({} as MedicineContextProps )

const initialState: MedicineState = {
    medicines: [],
}

export const MedicineProvider = ({ children }:HighOrderComponent) => {
    const chOptions = [ "6", "30", "200", "1000" ]

    const [ medicineState, dispatch ] = useReducer( medicineReducer, initialState )
    const { onChange, form: medicineData, resetValues, setFormValues } = useForm<MedicinePostRequest>({
        name: '',
        type: MedicineType.MEDICINE,
        ch: chOptions[0],
        medicines:[]
    })
    const newMedicineState = {
        medicineData,
        onChange,
    }

    const setNewMedicineFormValues = ( formValues: MedicinePostRequest ) => setFormValues( formValues );
    
    const resetNewMedicineFormValues = () => resetValues();

    return (
        <MedicineContext.Provider value={{
            medicineState,
            newMedicineState,
            chOptions,
            setNewMedicineFormValues,
            resetNewMedicineFormValues,
        }}>
            { children }
        </MedicineContext.Provider>
    )
}