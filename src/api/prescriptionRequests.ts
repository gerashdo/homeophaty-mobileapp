import { DeletePrescriptionResponse } from "../interfaces/medicine"
import homeophatyAPI from "./homeophatyAPI"


export const deletePrescription = async( id: string ) => {
    const { data } = await homeophatyAPI.delete<DeletePrescriptionResponse>(`/prescriptions/${ id }`)

    return data
}