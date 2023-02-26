import React, { useContext } from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import { NewMedicineForm } from '../components/medicine/NewMedicineForm'
import { appStyles } from '../theme/appTheme'
import { ScreenTemplate } from './ScreenTemplate'
import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import { MedicineContext } from '../context/medicine/MedicineContext';

export interface NewMedicineScreenProps extends StackScreenProps<MedicinesRootStackParamList,'NewMedicineScreen'>{}

export const NewMedicineScreen = ({ navigation }:NewMedicineScreenProps) => {
  const { medicineState: { errorMessage }} = useContext( MedicineContext )
  return (
    <ScreenTemplate
      style={{
        ...appStyles.globalMargin
      }}
    >
      <NewMedicineForm 
        onNavigateAddInnerMedicines={ 
          () => navigation.navigate('MedicineInnerMedsScreen') 
        }
        onSubmit={ () => {
          if( !errorMessage ) navigation.popToTop()
        }}
      />
    </ScreenTemplate>
  )
}
