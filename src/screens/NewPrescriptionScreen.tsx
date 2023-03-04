import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { NewMedicinePrescriptionForm } from '../components/medicine/NewMedicinePrescriptionForm'
import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import { appStyles } from '../theme/appTheme'
import { useCreatePrescription } from '../hooks/useMedicines'
import { NewPrescriptionRequest } from '../interfaces/medicine'

interface Props extends StackScreenProps<MedicinesRootStackParamList,'NewPrescriptionScreen'>{}

export const NewPrescriptionScreen = ({ navigation, route }:Props) => {

    const { medicine } = route.params
    const { createPrescriptionMutation } = useCreatePrescription()
    const { mutate, reset, isError } = createPrescriptionMutation

    if( !medicine ) return navigation.pop()

    const handleSubmit = ( prescriptionData: NewPrescriptionRequest ) => {
        reset()
        mutate({
            medicineId: medicine._id,
            prescription: prescriptionData
        })
        if( !isError ) navigation.pop()
    }

    return (
        <KeyboardAvoidingView 
            style={[ appStyles.globalMargin, { 
                flex: 1,
                paddingTop: 20,
            }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <NewMedicinePrescriptionForm 
                medicine={ medicine }
                onSubmit={ handleSubmit }
            />
        </KeyboardAvoidingView>
    )
}
