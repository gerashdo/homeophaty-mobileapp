import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'

import { search } from '../api/generalRequests'
import { 
    createMedicine, 
    createPrescription, 
    deleteMedicine, 
    getMedicine, 
    getMedicines, 
    updateMedicine 
} from '../api/medicineRequests'
import { getUncertainAxiosErrorMessage } from '../helpers/getUncertainErrorMessage'
import { ResultSearchAllowedTypes } from '../interfaces/common'
import { useBoundStore } from '../store/useBoundStore'


export const useMedicines = () => {
    const setError = useBoundStore(( state ) => state.setError )
    const setInitialMedicinesInformation = useBoundStore(( state ) => state.setInitialMedicinesInformation )
    const appendListOfMedicines = useBoundStore(( state ) => state.appendListOfMedicines )

    const medicinesQuery = useInfiniteQuery({
        queryKey: [ 'medicines' ],
        queryFn: ({ pageParam = 1 }) => getMedicines( pageParam ),
        getNextPageParam: ( lastPage ) => (
            Number(lastPage.page) < lastPage.totalPages ? Number( lastPage.page ) + 1 : undefined
        ),
        onSuccess: ( data ) => {
            if( data.pages.length === 1 ){
                setInitialMedicinesInformation( data.pages[0] )
            }else{
                appendListOfMedicines( data.pages[ data.pages.length -1 ].medicines )
            }
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
    const setError = useBoundStore(( state ) => state.setError )

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
    const setError = useBoundStore(( state ) => state.setError )

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
    const setError = useBoundStore(( state ) => state.setError )

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
    
    const setError = useBoundStore(( state ) => state.setError )

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

export const useDeleteMedicine = () => {

    const queryClient = useQueryClient()
    const setError = useBoundStore(( state ) => state.setError )

    const deleteMedicineMutation = useMutation({
        mutationFn: deleteMedicine,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [ 'medicines' ] })
        },
        onError: ( error ) => {
            setError( getUncertainAxiosErrorMessage( 
                error, 
                'No se pudo eliminar el medicamento'
            ))
        }
    })

    return {
        deleteMedicineMutation
    }
}

export const useCreatePrescription = () => {

    const queryClient = useQueryClient()
    const setError = useBoundStore(( state ) => state.setError )

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
