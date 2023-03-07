import { Medicine } from "../../interfaces/medicine";

type MedicineAction = 
    | { type: 'load_medicines', payload:{ 
        medicines: Medicine[],
        totalPages: number,
        totalMedicines: number,
        currentPage: string,
    }}

export interface MedicineState {
    medicines: Medicine[];
}

export const medicineReducer = ( state: MedicineState, action: MedicineAction ): MedicineState => {

    switch ( action.type ) {
        case 'load_medicines':
            return {
                ...state,
                medicines: action.payload.medicines,
            }
        default:
            return state
    }
}