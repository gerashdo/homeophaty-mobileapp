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
    | { type: 'set_active_medicine', payload: string }
    | { type: 'create_prescription', payload: Medicine }

export interface MedicineState {
    medicines: Medicine[];
    errorMessage: string | null;
    totalPages: number;
    currentPage: string;
    totalMedicines: number;
    activeMedicine: Medicine | null;
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
        case 'set_active_medicine':
            return {
                ...state,
                activeMedicine: state.medicines.filter( med => med._id === action.payload )[0] || null
            }
        case 'create_prescription':
            return {
                ...state,
                medicines: state.medicines.map( med => (
                    action.payload._id === med._id ? action.payload : med
                ))
            }
        default:
            return state
    }
}