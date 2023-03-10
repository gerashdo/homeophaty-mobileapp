import React, { useContext } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { ThemeContext } from '../../context/theme/ThemeContext'
import { Medicine, MedicineType } from '../../interfaces/medicine'
import { appStyles } from '../../theme/appTheme'
import { SimpleIconButton } from '../buttons/SimpleIconButton'
import { EmptyScreenMessage } from '../EmptyScreenMessage'
import { SectionContainer } from '../SectionContainer'
import { InnerMedicinesDetailsList } from './InnerMedicinesDetailsList'

interface Props {
    medicine: Medicine;
}

export const MedicineDetails = ({ medicine }:Props) => {

    const { theme: { colors }} = useContext( ThemeContext )

    return (
        <ScrollView 
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={ false }
        >
            <View style={[ appStyles.globalMargin ]}>
            {
                medicine!.type === MedicineType.FORMULA && (
                <>
                    <InnerMedicinesDetailsList medicine={ medicine }/>
                </>
                )
            }
            </View>
    
            <View style={[ appStyles.globalMargin ]}>
            {
                medicine!.prescription?.map( (pres, index) => (
                <SectionContainer 
                    key={ index }
                    style={{ paddingTop: 10 }}
                >
                    <View  style={{ flexDirection: 'row-reverse' }} >
                    <SimpleIconButton 
                        iconName='ellipsis-horizontal'
                        iconColor={ colors.text }
                    />
                    </View>
                    <Text style={[ appStyles.regularText, {
                    color: colors.text
                    }]}>{ pres.description }</Text>
                </SectionContainer>
                ))
            }
            </View>
    
            {
                medicine!.prescription?.length === 0 && (
                    <EmptyScreenMessage 
                        message='Agrega prescripciones para este medicamento con el boton +'
                        style={[ appStyles.globalMargin, {
                            flexGrow: 1,
                        }]}
                    />
                )
            }
        </ScrollView>
    )
}
