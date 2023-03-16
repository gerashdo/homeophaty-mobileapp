import React, { useContext } from 'react'
import { Text, View } from 'react-native'

import { ThemeContext } from '../../context/theme/ThemeContext'
import { Prescription } from '../../interfaces/medicine'
import { appStyles } from '../../theme/appTheme'
import { SimpleIconButton } from '../buttons/SimpleIconButton'

interface Props {
    prescription: Prescription;
}

export const MedicinePrescription = ({ prescription }:Props) => {

    const { theme: { colors }} = useContext( ThemeContext )

    return (
        <>
            <View  style={{ flexDirection: 'row-reverse' }} >
                <SimpleIconButton 
                    iconName='ellipsis-horizontal'
                    iconColor={ colors.text }
                />
            </View>

            <Text style={[ appStyles.regularText, {
                color: colors.text
            }]}>{ prescription.description }</Text>
        </>
    )
}
