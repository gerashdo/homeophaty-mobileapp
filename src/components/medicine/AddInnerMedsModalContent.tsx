import React from 'react'
import { View } from 'react-native'
import { MedicineSearchForm } from './MedicineSearchForm'
import { SimpleButtonWithLogo } from '../SimpleButtonWithLogo'

interface Props {
    onCloseModal: () => void;
}

export const AddInnerMedsModalContent = ({ onCloseModal }:Props) => {
    return (
        <View style={{ flex: 1, }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <View />
                <SimpleButtonWithLogo 
                    text='Listo'
                    onPress={ onCloseModal }
                />
            </View>
            <View style={{ marginTop: 10, flex: 1 }}>
                <MedicineSearchForm />
            </View>
        </View>
    )
}
