import { MedicinePostRequest, MedicinePostResponse, MedicineResponse, MedicinesResponse, NewPrescriptionRequest, NewPrescriptionResponse } from '../interfaces/medicine';
import homeophatyAPI from "./homeophatyAPI"

type UpdateMedicine = {
    medicineId: string,
    medicineData: MedicinePostRequest
}

type CreatePrescription = {
    medicineId: string, 
    prescription: NewPrescriptionRequest
}

export const getMedicines = async( page: number ) => {
    const { data } = await homeophatyAPI.get<MedicinesResponse>(`/medicine?page=${ page }`)
    
    return data
}

export const getMedicine = async( medicineId: string ) => {
    const { data } = await homeophatyAPI.get<MedicineResponse>(`/medicine/${ medicineId }`)
    
    return data
}

export const createMedicine = async( medicineData: MedicinePostRequest ): Promise<MedicinePostResponse> => {
    const { data } = await homeophatyAPI.post<MedicinePostResponse>('/medicine', medicineData )

    return data
}

export const updateMedicine = async({ medicineId, medicineData }:UpdateMedicine): Promise<MedicinePostResponse> => {
    const { data } = await homeophatyAPI.put<MedicinePostResponse>(
        `/medicine/${ medicineId }`, 
        medicineData 
    )
    
    return data
}

export const deleteMedicine = async( medicineId: string ) => {
    const { data } = await homeophatyAPI.delete<MedicinePostResponse>(`/medicine/${ medicineId }`)

    return data
}

export const createPrescription = async({ medicineId, prescription }:CreatePrescription) => {
    const { data } = await homeophatyAPI.post<NewPrescriptionResponse>(
        `/medicine/${ medicineId }/prescriptions`, 
        prescription 
    )

    return data.medicine
}