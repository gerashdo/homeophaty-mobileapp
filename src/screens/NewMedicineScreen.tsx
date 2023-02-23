import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { NewMedicineForm } from '../components/medicine/NewMedicineForm'
import { appStyles } from '../theme/appTheme'
import { ScreenTemplate } from './ScreenTemplate'
import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'

export interface NewMedicineScreenProps extends StackScreenProps<MedicinesRootStackParamList,'NewMedicineScreen'>{}

export const NewMedicineScreen = ({ navigation }:NewMedicineScreenProps) => {

  

  return (
    <ScreenTemplate
      style={{
        ...appStyles.globalMargin
      }}
    >
      <NewMedicineForm 
        onNavigateAddInnerMedicines={ ( form ) => navigation.navigate('MedicineInnerMedsScreen') }
        onSubmit={ ( medicineData ) => console.log( medicineData )}
      />
    </ScreenTemplate>
  )
}
