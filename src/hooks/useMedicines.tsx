import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createMedicine, createPrescription, getMedicine, getMedicines } from '../api/medicineRequests'
import { MedicinePostRequest } from '../interfaces/medicine'


export const useMedicines = (  ) => {

    const medicinesQuery = useQuery({
        queryKey: [ 'medicines' ],
        queryFn: getMedicines
    })

    return {
        medicinesQuery
    }
}

export const useMedicine = ( medicineId: string ) => {

    const medicineQuery = useQuery({
        queryKey: [ 'medicines', medicineId ],
        queryFn: () => getMedicine( medicineId )
    })

    return {
        medicineQuery
    }
}

export const useCreateMedicine = () => {

    const queryClient = useQueryClient()

    const createMedicineMutation = useMutation({
        mutationFn: createMedicine,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ 'medicines' ]})
        }
    })

    return {
        createMedicineMutation
    }
}

export const useCreatePrescription = () => {

    const queryClient = useQueryClient()

    const createPrescriptionMutation = useMutation({
        mutationFn: createPrescription,
        onSuccess: ( data ) => {
            queryClient.invalidateQueries({ queryKey: [ 'medicines', data._id ] })
        },
    })

    return {
        createPrescriptionMutation
    }

}
