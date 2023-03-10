import React, { useContext, useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { View } from 'react-native'

import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import { ThemeContext } from '../context/theme/ThemeContext'
import { FabButton } from '../components/FabButton';
import { SimpleButtonWithLogo } from '../components/SimpleButtonWithLogo';
import { useMedicine } from '../hooks/useMedicines';
import { CustomActivityIndicator } from '../components/ActivityIndicator';
import { MedicineDetails } from '../components/medicine/MedicineDetails';
import { MedicineDetailsHeader } from '../components/medicine/MedicineDetailsHeader';

interface Props extends StackScreenProps<MedicinesRootStackParamList,'MedicineScreen'>{}

export const MedicineScreen = ({ navigation, route }:Props) => {
  const { medicine: medicineParam } = route.params

  const { medicineQuery } = useMedicine( medicineParam._id )
  // const { theme: { colors }} = useContext( ThemeContext )

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <SimpleButtonWithLogo 
        iconName='pencil' text='Editar' 
        onPress={ () => navigation.navigate( 'NewMedicineScreen', { medicine: medicineParam }) }
      />
    })
  }, [])

  if( medicineQuery.isLoading ) return (
    <View style={{ flex: 1 }}>
      <CustomActivityIndicator />
    </View>
  )
  
  if( medicineQuery.isError ) return navigation.pop()

  const medicine = medicineQuery.data.medicine

  return (
    <View style={{ flex: 1 }} >
      <>
        <MedicineDetailsHeader medicine={ medicine } />
        <MedicineDetails medicine={ medicine } />
          
        <FabButton 
          iconName='add'
          onPress={ () => navigation.navigate( 'NewPrescriptionScreen', { medicine: medicine || medicineParam } )}
        />
      </>  
    </View>
  )
}


