import { DeletePrescriptionResponse, NewPrescriptionRequest, UpdatePrescriptionResponse } from "../interfaces/medicine"
import homeophatyAPI from "./homeophatyAPI"


export const deletePrescription = async( id: string ) => {
    const { data } = await homeophatyAPI.delete<DeletePrescriptionResponse>(`/prescriptions/${ id }`)

    return data
}

export const updatePrescription = async( id: string, prescriptionData: NewPrescriptionRequest ) => {
    const { data } = await homeophatyAPI.put<UpdatePrescriptionResponse>(
        `/prescriptions/${ id }`, 
        prescriptionData,
    )

    return data
}