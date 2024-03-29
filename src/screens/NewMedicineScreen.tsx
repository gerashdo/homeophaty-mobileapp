import React, { useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import { MedicineForm } from '../components/medicine/MedicineForm'
import { appStyles } from '../theme/appTheme'
import { ScreenTemplate } from './ScreenTemplate'
import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import { MedicineType } from '../interfaces/medicine'
import { useMedicineNewEdit } from '../hooks/useMedicineNewEdit'

export interface NewMedicineScreenProps extends StackScreenProps<MedicinesRootStackParamList,'NewMedicineScreen'>{}

export const NewMedicineScreen = ({ navigation, route }:NewMedicineScreenProps) => {

  const { medicine } = route.params

  const { 
    setNewMedicineFormValues, 
    resetNewMedicineFormValues,
    submit,
  } = useMedicineNewEdit({ medicine })

  useEffect(() => {
    if( medicine ){
      setNewMedicineFormValues({
        name: medicine.name,
        medicines: medicine.medicines,
        type: medicine.type as MedicineType,
        ch: medicine.ch,
      })
    }else{
      resetNewMedicineFormValues()
    }
  }, [])

  const handleSubmit = async() => {
    const result = await submit()
    if( result ) navigation.pop()
  }
  
  return (
    <ScreenTemplate
      style={{
        ...appStyles.globalMargin
      }}
    >
      <MedicineForm
        onNavigateAddInnerMedicines={ 
          () => navigation.navigate('MedicineInnerMedsScreen', {
            medicine: medicine ? medicine : null,
          }) 
        }
        onSubmit={ handleSubmit }
      />
    </ScreenTemplate>
  )
}
