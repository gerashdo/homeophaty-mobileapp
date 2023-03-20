import React, { useContext } from 'react'
import { Text, View } from 'react-native'

import { ThemeContext } from '../../context/theme/ThemeContext'
import { Prescription } from '../../interfaces/medicine'
import { useBoundStore } from '../../store/useBoundStore'
import { appStyles } from '../../theme/appTheme'
import { SimpleIconButton } from '../buttons/SimpleIconButton'

interface Props {
    prescription: Prescription;
}

export const MedicinePrescription = ({ prescription }:Props) => {

    const { theme: { colors }} = useContext( ThemeContext )
    const openModal = useBoundStore(( state ) => state.openModal )

    return (
        <>
            <View  style={{ flexDirection: 'row-reverse' }} >
                <SimpleIconButton 
                    iconName='ellipsis-horizontal'
                    iconColor={ colors.text }
                    onPress={ openModal }
                />
            </View>

            <Text style={[ appStyles.regularText, {
                color: colors.text
            }]}>{ prescription.description }</Text>
        </>
    )
}
