import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePrescription } from "../api/prescriptionRequests"
import { getUncertainAxiosErrorMessage } from "../helpers/getUncertainErrorMessage"
import { useBoundStore } from "../store/useBoundStore"

interface DeletePrescriptionProps {
    prescriptionId: string; 
    medicineId: string;
}

export const usePrescription = () => {

    const queryClient = useQueryClient()
    const setError = useBoundStore(( state ) => state.setError )
    const errorMessage = useBoundStore(( state ) => state.errorMessage )

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

    return {
        deletePresctiptionMutation,
    }
}