import { getUncertainAxiosErrorMessage } from "../helpers/getUncertainErrorMessage"
import { DeletePrescriptionResponse, NewPrescriptionRequest, UpdatePrescriptionResponse } from "../interfaces/medicine"
import homeophatyAPI from "./homeophatyAPI"


export const deletePrescription = async( id: string ) => {
    try {
        const { data } = await homeophatyAPI.delete<DeletePrescriptionResponse>(`/prescriptions/${ id }`)
    
        return data
    } catch (error) {
        return Promise.reject( new Error( getUncertainAxiosErrorMessage( 
            error, 
            'No fue posible eliminar la prescripción'
        )))
    }
}

export const updatePrescription = async( id: string, prescriptionData: NewPrescriptionRequest ) => {
    try {
        const { data } = await homeophatyAPI.put<UpdatePrescriptionResponse>(
            `/prescriptions/${ id }`, 
            prescriptionData,
        )
    
        return data
    } catch (error) {
        return Promise.reject( new Error( getUncertainAxiosErrorMessage( 
            error, 
            'No fue posible actualizar la prescripción'
        )))
    }
}