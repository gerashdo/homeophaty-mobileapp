import { create } from 'zustand'
import { createMedicineSlice, MedicineSlice } from './medicineSlice';


export const useBoundStore = create<MedicineSlice>(( ...a ) => ({
    ...createMedicineSlice( ...a ),
}))