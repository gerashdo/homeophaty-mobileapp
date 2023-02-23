import { Medicine } from "../../interfaces/medicine";

type MedicineAction = 
    | { type: 'load_medicines', payload:{ 
        medicines: Medicine[],
        totalPages: number,
        totalMedicines: number,
        currentPage: string,
    }}
    | { type: 'set_error', payload: string }
    | { type: 'remove_error' }
    | { type: 'create_medicine', payload: Medicine } 

export interface MedicineState {
    medicines: Medicine[];
    errorMessage: string | null;
    totalPages: number;
    currentPage: string;
    totalMedicines: number;
}

export const medicineReducer = ( state: MedicineState, action: MedicineAction ): MedicineState => {

    switch ( action.type ) {
        case 'load_medicines':
            return {
                ...state,
                medicines: action.payload.medicines,
                totalMedicines: action.payload.totalMedicines,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages,
            }
        case 'set_error':
            return {
                ...state,
                errorMessage: action.payload,
            }
        case 'remove_error':
            return {
                ...state,
                errorMessage: null,
            }
        case 'create_medicine':
            return {
                ...state,
                medicines: [ ...state.medicines, action.payload ]
            }
        default:
            return state
    }
}