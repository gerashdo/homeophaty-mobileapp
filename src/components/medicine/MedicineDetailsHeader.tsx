import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ThemeContext } from '../../context/theme/ThemeContext'
import { Medicine, MedicineType } from '../../interfaces/medicine'
import { appStyles } from '../../theme/appTheme'

interface Props {
    medicine: Medicine;
}

export const MedicineDetailsHeader = ({ medicine }:Props) => {
    const { theme: { colors }} = useContext( ThemeContext )

    return (
        <View style={[ styles.titleContainer ]}>
            <Text style={[ appStyles.title, {
                color: colors.text,
            }]}>{medicine!.name}</Text>
            {
                medicine!.type === MedicineType.MEDICINE && (
                    <Text style={[ appStyles.subTitle, {
                        color: colors.text,
                    }]}>{ medicine!.ch } ch</Text>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    }
  })
