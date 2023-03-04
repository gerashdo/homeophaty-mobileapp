import { MedicinePostRequest, MedicinePostResponse, MedicineResponse, MedicinesResponse, NewPrescriptionRequest, NewPrescriptionResponse } from '../interfaces/medicine';
import homeophatyAPI from "./homeophatyAPI"

type CreatePrescription = {
    medicineId: string, 
    prescription: NewPrescriptionRequest
}

export const getMedicines = async() => {
    const { data } = await homeophatyAPI.get<MedicinesResponse>('/medicine')
    console.log('loadedMedicines')
    return data
}

export const getMedicine = async( medicineId: string ) => {
    const { data } = await homeophatyAPI.get<MedicineResponse>(`/medicine/${ medicineId }`)
    console.log( 'gotMedicine' )
    return data
}

export const createMedicine = async( medicineData: MedicinePostRequest ): Promise<MedicinePostResponse> => {
    const { data } = await homeophatyAPI.post<MedicinePostResponse>('/medicine', medicineData )
    return data
}

export const createPrescription = async({ medicineId, prescription }:CreatePrescription) => {
    const { data } = await homeophatyAPI.post<NewPrescriptionResponse>(
        `/medicine/${ medicineId }/prescriptions`, 
        prescription 
    )

    return data.medicine
}