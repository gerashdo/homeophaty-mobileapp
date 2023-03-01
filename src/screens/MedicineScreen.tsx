import React, { useContext, useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { StyleSheet, Text, View } from 'react-native'
import  Icon  from 'react-native-vector-icons/Ionicons';

import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import { MedicineType } from '../interfaces/medicine'
import { InnerMedicinesDetailsList } from '../components/medicine/InnerMedicinesDetailsList'
import { appStyles } from '../theme/appTheme'
import { ThemeContext } from '../context/theme/ThemeContext'

interface Props extends StackScreenProps<MedicinesRootStackParamList,'MedicineScreen'>{}

export const MedicineScreen = ({ route, navigation }:Props) => {
  const { medicine } = route.params

  const { theme: { colors, secondary, buttonTextColor }} = useContext( ThemeContext )

  useEffect(() => {
    navigation.setOptions({
      headerStyle:{
        backgroundColor: ( medicine.type === MedicineType.MEDICINE )
        ? colors.primary : secondary,
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerBackImage: () => <Icon size={ 30 } color={ buttonTextColor } name='chevron-back' />
    })
  }, [])
  

  return (
    <View >
        
        <View style={[ styles.titleContainer, {
          backgroundColor: ( medicine.type === MedicineType.MEDICINE )
            ? colors.primary : secondary,
        }]}>
          <Text style={[ appStyles.title, {
            color: buttonTextColor,
          }]}>{medicine.name}</Text>
          {
            medicine.type === MedicineType.MEDICINE && (
              <Text style={[ appStyles.subTitle, {
                color: buttonTextColor,
              }]}>{ medicine.ch }</Text>
            )
          }
        </View>

        <View style={[ appStyles.globalMargin ]}>
          {
            medicine.type === MedicineType.FORMULA && (
              <>
                <InnerMedicinesDetailsList medicine={ medicine }/>
              </>
            )
          }
        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  }
})
