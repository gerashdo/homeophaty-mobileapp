import React, { useContext } from 'react'
import { Text, View } from 'react-native'

import { ThemeContext } from '../../context/theme/ThemeContext'
import { Prescription } from '../../interfaces/medicine'
import { useBoundStore } from '../../store/useBoundStore'
import { appStyles } from '../../theme/appTheme'
import { SimpleIconButton } from '../buttons/SimpleIconButton'

interface Props {
    prescription: Prescription;
    onOptionsPress: ( prescription: Prescription ) => void;
}

export const MedicinePrescription = ({ prescription, onOptionsPress }:Props) => {

    const { theme: { colors }} = useContext( ThemeContext )

    const handlePress = () => {
        onOptionsPress( prescription )
    }

    return (
        <>
            <View  style={{ flexDirection: 'row-reverse' }} >
                <SimpleIconButton 
                    iconName='ellipsis-horizontal'
                    iconColor={ colors.text }
                    onPress={ handlePress }
                />
            </View>

            <Text style={[ appStyles.regularText, {
                color: colors.text
            }]}>{ prescription.description }</Text>
        </>
    )
}
