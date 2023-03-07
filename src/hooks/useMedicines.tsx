import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { search } from '../api/generalRequests'
import { createMedicine, createPrescription, getMedicine, getMedicines, updateMedicine } from '../api/medicineRequests'
import { getUncertainAxiosErrorMessage } from '../helpers/getUncertainErrorMessage'
import { ResultSearchAllowedTypes } from '../interfaces/common'
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

export const useSearch = <T extends keyof ResultSearchAllowedTypes,>( termn: string, collection: T ) => {
    
    const { setError } = useBoundStore()

    const searchQuery = useQuery({
        queryKey: [ 'search', termn ],
        queryFn: () => search( termn, collection ),
        onError: ( error ) => {
            setError( getUncertainAxiosErrorMessage( 
                error, 
                'No se pudo realizar la búsqueda'
            ))
        }, 
        enabled: !!termn
    })

    return {
        searchQuery
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
