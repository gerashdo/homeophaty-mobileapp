import { StateCreator } from "zustand";
import { Medicine, MedicinesResponse, Prescription } from "../interfaces/medicine";
import { UiSlice } from "./uiSlice";

export interface MedicineSlice {
    medicines: Medicine[];
    errorMessage: string | null;
    totalPages: number;
    currentPage: string;
    totalMedicines: number;
    activeMedicine: Medicine | null;
    activePrescription: Prescription | null;
    setError: ( error: string ) => void;
    setActiveMedicine: ( medicineId: string ) => void;
    setMedicines: ( medicines: Medicine[] ) => void; // not being used
    setInitialMedicinesInformation: ( info: MedicinesResponse ) => void;
    appendListOfMedicines: ( medicines: Medicine[] ) => void;
    setActivePrescription: ( prescription: Prescription ) => void;
    unsetActivePrescription: () => void;
}

export const createMedicineSlice: StateCreator<
    MedicineSlice & UiSlice,
    [],
    [],
    MedicineSlice
> = ( set, get ) => ({
    medicines: [],
    totalMedicines: 0,
    totalPages: 1,
    currentPage: '1',
    errorMessage: null,
    activeMedicine: null,
    activePrescription: null,
    setError: ( error: string ) => {
        set({ errorMessage: error })
        setTimeout(() => {
            set({ errorMessage: null })
        }, 8000);
    },
    setActiveMedicine: ( medicineId: string ) => { // is it being used?
        set(( state ) => ({ 
            activeMedicine: state.medicines.filter( med => med._id === medicineId )[0] || null
        }))
    },
    setMedicines: ( medicines: Medicine[] ) => {
        set(( state ) => ({
            ...state,
            medicines
        }))
    },
    appendListOfMedicines: ( medicines: Medicine[] ) => {
        set(( state ) => ({
            ...state,
            medicines: [ ...state.medicines, ...medicines ]
        }))
    },
    setInitialMedicinesInformation: ({ 
            medicines, 
            totalMedicines, 
            page, 
            totalPages 
    }) => {
        set(( state ) => ({
            ...state,
            medicines,
            totalMedicines,
            totalPages,
            currentPage: page,
            errorMessage: null,
        }))
    },
    setActivePrescription: ( prescription: Prescription ) => {
        set({ activePrescription: prescription })
    },
    unsetActivePrescription: () => {
        set({ activePrescription: null })
    },
})