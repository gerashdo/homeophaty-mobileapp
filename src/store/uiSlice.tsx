import { StateCreator } from "zustand";
import { MedicineSlice } from "./medicineSlice";

export interface UiSlice {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void; 
}

export const createUiSlice: StateCreator<
    MedicineSlice & UiSlice,
    [],
    [],
    UiSlice
> = ( set, get ) => ({
    isModalOpen: false,
    openModal: () => {
        set({ isModalOpen: true })
    },
    closeModal: () => {
        set({ isModalOpen: false })
    },
}) 