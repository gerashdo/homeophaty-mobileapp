import { useContext } from "react"
import { MedicineContext } from "../context/medicine/MedicineContext"
import { Medicine } from "../interfaces/medicine"
import { useCreateMedicine, useUpdateMedicine } from "./useMedicines"

type Props = {
    medicine: Medicine | null;
}

export const useMedicineNewEdit = ({ medicine = null }:Props) => {

    const { 
        newMedicineState,
        resetNewMedicineFormValues,
        setNewMedicineFormValues,
    } = useContext( MedicineContext )
    const { medicineData, onChange } = newMedicineState
    const { medicines } = medicineData

    const { createMedicineMutation } = useCreateMedicine()
    const { updateMedicineMutation } = useUpdateMedicine()

    const { isError: isErrorCreate } = createMedicineMutation
    const { isError: isErrorUpdate } = updateMedicineMutation

    const submit = async() => {
        if( medicine ){
            await updateMedicineMutation.mutateAsync({
                medicineId: medicine._id,
                medicineData
            })
        }else{
            await createMedicineMutation.mutateAsync( medicineData )
        }
    }

    return {
        resetNewMedicineFormValues,
        setNewMedicineFormValues,
        submit,
        onChange,
        medicines,
        isErrorCreate,
        isErrorUpdate,
    }
}