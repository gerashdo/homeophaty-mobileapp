import { create } from 'zustand'
import { createMedicineSlice, MedicineSlice } from './medicineSlice';
import { createUiSlice, UiSlice } from './uiSlice';


export const useBoundStore = create<MedicineSlice & UiSlice>()(( ...a ) => ({
    ...createMedicineSlice( ...a ),
    ...createUiSlice( ...a ),
}))