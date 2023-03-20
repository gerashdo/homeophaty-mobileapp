import React from 'react'
import { ScrollView, View } from 'react-native'

import { Medicine, MedicineType, Prescription } from '../../interfaces/medicine'
import { useBoundStore } from '../../store/useBoundStore'
import { appStyles } from '../../theme/appTheme'
import { EmptyScreenMessage } from '../EmptyScreenMessage'
import { SectionContainer } from '../SectionContainer'
import { InnerMedicinesDetailsList } from './InnerMedicinesDetailsList'
import { MedicinePrescription } from './MedicinePrescription'

interface Props {
    medicine: Medicine;
}

export const MedicineDetails = ({ medicine }:Props) => {

    const openModal = useBoundStore(( state ) => state.openModal )
    const setActivePrescription = useBoundStore(( state ) => state.setActivePrescription )

    const handlePrescriptionOptions = ( prescription: Prescription ) => {
        openModal()
        setActivePrescription( prescription )
    }

    return (
        <ScrollView 
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={ false }
        >
            <View style={[ appStyles.globalMargin ]}>
            {
                medicine.type === MedicineType.FORMULA && (
                <>
                    <InnerMedicinesDetailsList medicine={ medicine }/>
                </>
                )
            }
            </View>
    
            <View style={[ appStyles.globalMargin ]}>
            {
                medicine.prescription?.map( (pres, index) => (
                <SectionContainer 
                    key={ index }
                    style={{ paddingTop: 10 }}
                >
                    <MedicinePrescription 
                        prescription={ pres }
                        onOptionsPress={ handlePrescriptionOptions } 
                    />
                </SectionContainer>
                ))
            }
            </View>
    
            {
                medicine.prescription?.length === 0 && (
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
