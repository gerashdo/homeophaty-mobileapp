import { create } from 'zustand'
import { getUncertainAxiosErrorMessage } from '../helpers/getUncertainErrorMessage';
import { Medicine  } from '../interfaces/medicine';

interface MedicineState {
    medicines: Medicine[];
    errorMessage: string | null;
    totalPages: number;
    currentPage: string;
    totalMedicines: number;
    activeMedicine: Medicine | null;
    isLoading: boolean;
}

interface MedicineActions {
    setError: ( error: string ) => void;
    setActiveMedicine: ( medicineId: string ) => void;
    setMedicines: ( medicines: Medicine[] ) => void;
}

export const useBoundStore = create<MedicineState & MedicineActions >(( set, get ) => ({
    medicines: [],
    totalMedicines: 0,
    totalPages: 1,
    currentPage: '1',
    errorMessage: null,
    activeMedicine: null,
    isLoading: false,
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
    }
}))