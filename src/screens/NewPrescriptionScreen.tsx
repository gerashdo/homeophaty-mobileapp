import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { NewMedicinePrescriptionForm } from '../components/medicine/NewMedicinePrescriptionForm'
import { MedicineContext } from '../context/medicine/MedicineContext'
import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import { appStyles } from '../theme/appTheme'

interface Props extends StackScreenProps<MedicinesRootStackParamList,'NewPrescriptionScreen'>{}

export const NewPrescriptionScreen = ({ navigation, route }:Props) => {

    const { medicine } = route.params

    const { medicineState: { errorMessage } } = useContext( MedicineContext )

    const handleSubmit = async() => {
        if( !errorMessage ) navigation.goBack()
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
