import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createMedicine, createPrescription, getMedicine, getMedicines, updateMedicine } from '../api/medicineRequests'
import { getUncertainAxiosErrorMessage } from '../helpers/getUncertainErrorMessage'
import { useBoundStore } from '../store/useBoundStore'


export const useMedicines = (  ) => {
    const { setError, setInitialMedicinesInformation } = useBoundStore()

    const medicinesQuery = useQuery({
        queryKey: [ 'medicines' ],
        queryFn: getMedicines,
        onSuccess: ( data ) => {
            setInitialMedicinesInformation( data )
        },
        onError: ( error ) => {
            setError( getUncertainAxiosErrorMessage( 
                error, 
                'No fue posible cargar los medicamentos'
            ))
        },
    })

    return {
        medicinesQuery
    }
}

export const useMedicine = ( medicineId: string ) => {
    const { setError } = useBoundStore()

    const medicineQuery = useQuery({
        queryKey: [ 'medicines', medicineId ],
        queryFn: () => getMedicine( medicineId ),
        onError: ( error ) => {
            setError( getUncertainAxiosErrorMessage( 
                error, 
                'No fue posible cargar el medicamento'
            ))
        },
    })

    return {
        medicineQuery
    }
}

export const useCreateMedicine = () => {

    const queryClient = useQueryClient()
    const { setError } = useBoundStore()

    const createMedicineMutation = useMutation({
        mutationFn: createMedicine,
        onSuccess: () => {
            queryClient.invalidateQueries({ 
                queryKey: [ 'medicines' ],
            })
        },
        onError: ( error ) => {
            setError( getUncertainAxiosErrorMessage( 
                error, 
                'No se pudo guardar el medicamento'
            ))
        },
    })

    return {
        createMedicineMutation
    }
}

export const useUpdateMedicine = () => {

    const queryClient = useQueryClient()
    const { setError } = useBoundStore()

    const updateMedicineMutation = useMutation({
        mutationFn: updateMedicine,
        onSuccess: ( data ) => {
            console.log('newData')
            console.log( JSON.stringify( data, null, 3))
            queryClient.invalidateQueries({ queryKey: [ 'medicines' ]})
        },
        onError: ( error ) => {
            setError( getUncertainAxiosErrorMessage( 
                error, 
                'No se pudo actualizar el medicamento'
            ))
        },
    })

    return {
        updateMedicineMutation
    }
}

export const useCreatePrescription = () => {

    const queryClient = useQueryClient()
    const { setError } = useBoundStore()

    const createPrescriptionMutation = useMutation({
        mutationFn: createPrescription,
        onSuccess: ( data ) => {
            queryClient.invalidateQueries({ queryKey: [ 'medicines', data._id ] })
        },
        onError: ( error ) => {
            setError( getUncertainAxiosErrorMessage( 
                error, 
                'No se pudo guardar la prescripción'
            ))
        },
    })

    return {
        createPrescriptionMutation
    }

}
