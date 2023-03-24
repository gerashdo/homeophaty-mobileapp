import { getUncertainAxiosErrorMessage } from '../helpers/getUncertainErrorMessage';
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
    try {
        const { data } = await homeophatyAPI.get<MedicinesResponse>(`/medicine?page=${ page }`)
        
        return data
    } catch ( error ) {
        throw new Error( getUncertainAxiosErrorMessage( 
            error, 
            'No fue posible cargar los medicamentos'
        ))
    }
}

export const getMedicine = async( medicineId: string ) => {
    try {
        const { data } = await homeophatyAPI.get<MedicineResponse>(`/medicine/${ medicineId }`)
    
        return data
    } catch ( error ) {
        throw new Error( getUncertainAxiosErrorMessage( 
            error, 
            'No fue posible cargar el medicamento'
        ))
    }
}

export const createMedicine = async( medicineData: MedicinePostRequest ): Promise<MedicinePostResponse> => {
    try {
        const { data } = await homeophatyAPI.post<MedicinePostResponse>('/medicine', medicineData )
    
        return data

    } catch ( error ) {
        return Promise.reject( new Error( getUncertainAxiosErrorMessage( 
            error, 
            'No se pudo guardar el medicamento'
        )))
    }
}

export const updateMedicine = async({ medicineId, medicineData }:UpdateMedicine): Promise<MedicinePostResponse> => {
    
    try {
        const { data } = await homeophatyAPI.put<MedicinePostResponse>(
            `/medicine/${ medicineId }`, 
            medicineData 
        )
        
        return data
    } catch ( error ) {
        throw new Error( getUncertainAxiosErrorMessage( 
            error, 
            'No se pudo actualizar el medicamento'
        ))
    }

}

export const deleteMedicine = async( medicineId: string ) => {
    try {
        const { data } = await homeophatyAPI.delete<MedicinePostResponse>(`/medicine/${ medicineId }`)
    
        return data
        
    } catch ( error ) {
        throw new Error( getUncertainAxiosErrorMessage( 
            error, 
            'No se pudo eliminar el medicamento'
        ))
    }
}

export const createPrescription = async({ medicineId, prescription }:CreatePrescription) => {
    try {
        const { data } = await homeophatyAPI.post<NewPrescriptionResponse>(
            `/medicine/${ medicineId }/prescriptions`, 
            prescription 
        )
    
        return data.medicine
        
    } catch ( error ) {
        throw new Error( getUncertainAxiosErrorMessage( 
            error, 
            'No se pudo guardar la prescripción'
        ))
    }
}