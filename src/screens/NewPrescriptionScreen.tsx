import React, { useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { KeyboardAvoidingView, Platform } from 'react-native'

import { NewMedicinePrescriptionForm } from '../components/medicine/NewMedicinePrescriptionForm'
import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import { appStyles } from '../theme/appTheme'
import { useCreatePrescription } from '../hooks/useMedicines'
import { NewPrescriptionRequest } from '../interfaces/medicine'
import { useBoundStore } from '../store/useBoundStore'
import { usePrescription } from '../hooks/usePrescriptions'
import { ScreenTemplate } from './ScreenTemplate'

interface Props extends StackScreenProps<MedicinesRootStackParamList,'NewPrescriptionScreen'>{}

export const NewPrescriptionScreen = ({ navigation, route }:Props) => {

    const { medicine } = route.params
    const activePrescription = useBoundStore(( state ) => state.activePrescription )
    const { createPrescriptionMutation } = useCreatePrescription()
    const { updatePrescriptionMutation } = usePrescription()

    useEffect(() => {
      if( !medicine ) navigation.pop()
    }, [ medicine ])

    const handleSubmit = async( prescriptionData: NewPrescriptionRequest ) => {
        try {
            if( !activePrescription ){
                createPrescriptionMutation.reset()
                await createPrescriptionMutation.mutateAsync({
                    medicineId: medicine._id,
                    prescription: prescriptionData
                })
                if( !createPrescriptionMutation.isError ) navigation.pop()
            }else{
                updatePrescriptionMutation.reset()
                await updatePrescriptionMutation.mutateAsync({
                    prescriptionId: activePrescription._id,
                    prescriptionData,
                    medicineId: medicine._id
                })
                
                if( !updatePrescriptionMutation.isError ) navigation.pop()
            }
        } catch (error) {
            console.log( error )
        }
    }

    return (
        <ScreenTemplate>
            <KeyboardAvoidingView 
                style={[ appStyles.globalMargin, { 
                    flex: 1,
                    paddingTop: 20,
                }]}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                <NewMedicinePrescriptionForm
                    onSubmit={ handleSubmit }
                    initialtext={ activePrescription?.description }
                    />
            </KeyboardAvoidingView>
        </ScreenTemplate>
    )
}
