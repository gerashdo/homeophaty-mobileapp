import React, { useContext, useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { StyleSheet, Text, View } from 'react-native'
import  Icon  from 'react-native-vector-icons/Ionicons';

import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import { MedicineType, Medicine } from '../interfaces/medicine';
import { InnerMedicinesDetailsList } from '../components/medicine/InnerMedicinesDetailsList'
import { appStyles } from '../theme/appTheme'
import { ThemeContext } from '../context/theme/ThemeContext'
import { SectionContainer } from '../components/SectionContainer';
import { FabButton } from '../components/FabButton';

interface Props extends StackScreenProps<MedicinesRootStackParamList,'MedicineScreen'>{}

export const MedicineScreen = ({ route }:Props) => {
  const { medicine } = route.params

  const { theme: { colors }} = useContext( ThemeContext )

  return (
    <View style={{ flex: 1 }}>

        <View style={[ styles.titleContainer ]}>
          <Text style={[ appStyles.title, {
            color: colors.text,
          }]}>{medicine.name}</Text>
          {
            medicine.type === MedicineType.MEDICINE && (
              <Text style={[ appStyles.subTitle, {
                color: colors.text,
              }]}>{ medicine.ch } ch</Text>
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

        <View style={[ appStyles.globalMargin ]}>
          {
            medicine.prescription?.map( (pres, index) => (
              <SectionContainer key={ index }>
                <Text style={[ appStyles.regularText, {
                  color: colors.text
                }]}>{ pres.description }</Text>
              </SectionContainer>
            ))
          }
        </View>

      <FabButton 
        iconName='add'
      />
        
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
