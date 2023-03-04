import React, { useContext, useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack'

import { MedicineForm } from '../components/medicine/MedicineForm'
import { appStyles } from '../theme/appTheme'
import { ScreenTemplate } from './ScreenTemplate'
import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import { MedicineContext } from '../context/medicine/MedicineContext';
import { MedicineType } from '../interfaces/medicine'
import { useCreateMedicine, useUpdateMedicine } from '../hooks/useMedicines'

export interface NewMedicineScreenProps extends StackScreenProps<MedicinesRootStackParamList,'NewMedicineScreen'>{}

export const NewMedicineScreen = ({ navigation, route }:NewMedicineScreenProps) => {

  const { medicine } = route.params

  const { 
    medicineState: { errorMessage }, 
    newMedicineState,
    resetNewMedicineFormValues,
    setNewMedicineFormValues,
  } = useContext( MedicineContext )
  const { medicineData } = newMedicineState
  const { createMedicineMutation } = useCreateMedicine()
  const { updateMedicineMutation } = useUpdateMedicine()

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
  
  const handleSubmit = () => {
    if( medicine ){
      updateMedicineMutation.mutate({
        medicineId: medicine._id,
        medicineData
      })
      if( !updateMedicineMutation.isError ) navigation.popToTop()
    }else{
      createMedicineMutation.mutate( medicineData )
      
    }
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
