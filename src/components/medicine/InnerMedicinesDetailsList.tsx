import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { Medicine, MedicineType } from '../../interfaces/medicine'
import { appStyles } from '../../theme/appTheme';
import { SectionContainer } from '../SectionContainer';

interface Props {
    medicine: Medicine;
}

export const InnerMedicinesDetailsList = ({ medicine }:Props) => {

    const { theme:{ colors }} = useContext( ThemeContext )

    return (
        <SectionContainer>
            {
                medicine.medicines.map( med => (
                    <View 
                        key={ med._id }
                        style={[ styles.itemContainer ]}
                    >
                    <Text
                        style={[ appStyles.regularText, styles.title ,{
                            color: colors.text,
                        }]}
                    >{ med.name }{ 
                        med.type === MedicineType.MEDICINE && ` ${ med.ch } ch`
                    }</Text>
                    </View>
                ))
            }
        </SectionContainer>
    )
}

const styles = StyleSheet.create({
    itemContainer:{
        marginVertical: 7,
    },
    title:{
        fontSize: 18,
    }
})


