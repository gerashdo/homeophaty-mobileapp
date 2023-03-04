import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createMedicine, createPrescription, getMedicine, getMedicines, updateMedicine } from '../api/medicineRequests'


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
        queryFn: () => getMedicine( medicineId ),
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

export const useUpdateMedicine = () => {

    const queryClient = useQueryClient()

    const updateMedicineMutation = useMutation({
        mutationFn: updateMedicine,
        onSuccess: ( data ) => {
            console.log('newData')
            console.log( JSON.stringify( data, null, 3))
            queryClient.invalidateQueries({ queryKey: [ 'medicines' ]})
        }
    })

    return {
        updateMedicineMutation
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
