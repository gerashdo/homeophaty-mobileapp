import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePrescription, updatePrescription } from "../api/prescriptionRequests"
import { getUncertainAxiosErrorMessage } from "../helpers/getUncertainErrorMessage"
import { NewPrescriptionRequest } from "../interfaces/medicine";
import { useBoundStore } from "../store/useBoundStore"

interface DeletePrescriptionProps {
    prescriptionId: string; 
    medicineId: string;
}

interface UpdatePrescriptionProps {
    prescriptionId: string; 
    prescriptionData: NewPrescriptionRequest;
    medicineId: string;
}

export const usePrescription = () => {

    const queryClient = useQueryClient()
    const setError = useBoundStore(( state ) => state.setError )
    // const errorMessage = useBoundStore(( state ) => state.errorMessage )

    const deletePresctiptionMutation = useMutation({
        mutationFn: ({ prescriptionId }: DeletePrescriptionProps) => deletePrescription( prescriptionId ),
        onSuccess: ( __, variables ) => {
            queryClient.invalidateQueries({
                queryKey: [ 'medicines', variables.medicineId ]
            })
        },
        onError: ( error ) => {
            setError( getUncertainAxiosErrorMessage( error, 'No fue posible eliminar la prescripción' ))
        }
    })

    const updatePrescriptionMutation = useMutation({
        mutationFn: ({
            prescriptionId,
            prescriptionData,
        }:UpdatePrescriptionProps) => updatePrescription( prescriptionId, prescriptionData ),
        onSuccess: ( __, variables ) => {
            queryClient.invalidateQueries({
                queryKey: [ 'medicines', variables.medicineId ]
            })
        },
        onError: async( error ) => {
            setError( getUncertainAxiosErrorMessage( error, 'No fue posible eliminar la prescripción' ))
        }
    })

    return {
        deletePresctiptionMutation,
        updatePrescriptionMutation,
    }
}