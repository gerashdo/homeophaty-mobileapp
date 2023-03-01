import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { NewMedicinePrescriptionForm } from '../components/medicine/NewMedicinePrescriptionForm'
import { SimpleButtonWithLogo } from '../components/SimpleButtonWithLogo'
import { ThemeContext } from '../context/theme/ThemeContext'
import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import { appStyles } from '../theme/appTheme'

interface Props extends StackScreenProps<MedicinesRootStackParamList,'NewPrescriptionScreen'>{}

export const NewPrescriptionScreen = ({ navigation }:Props) => {
    const { theme:{ buttonTextColor, colors }} = useContext( ThemeContext )
    const [ value, setValue ] = useState('')

    

    useEffect(() => {
      navigation.setOptions({
        headerRight: () => <SimpleButtonWithLogo 
            text='Guardar'
            color={ buttonTextColor }
            backgroundColor={ colors.primary }
            onPress={ () => handleSubmit }
        />,
      })
    }, [])

    const handleSubmit = () => {
        console.log( value )
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
                value={ value }
                onValueChange={ ( value ) => setValue( value ) }
            />
        </KeyboardAvoidingView>
    )
}
