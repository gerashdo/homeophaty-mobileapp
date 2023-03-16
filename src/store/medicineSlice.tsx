import { StateCreator } from "zustand";
import { Medicine, MedicinesResponse } from "../interfaces/medicine";

export interface MedicineSlice {
    medicines: Medicine[];
    errorMessage: string | null;
    totalPages: number;
    currentPage: string;
    totalMedicines: number;
    activeMedicine: Medicine | null;
    setError: ( error: string ) => void;
    setActiveMedicine: ( medicineId: string ) => void;
    setMedicines: ( medicines: Medicine[] ) => void; // not being used
    setInitialMedicinesInformation: ( info: MedicinesResponse ) => void;
}

export const createMedicineSlice: StateCreator<
    MedicineSlice,
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
    setError: ( error: string ) => {
        set({ errorMessage: error })
        setTimeout(() => {
            set({ errorMessage: null })
        }, 8000);
    },
    setActiveMedicine: ( medicineId: string ) => {
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
    }
})