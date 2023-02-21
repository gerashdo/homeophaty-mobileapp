import React, { useContext, useEffect } from 'react'
import { Text, View } from 'react-native'
import { CustomActivityIndicator } from '../components/ActivityIndicator'
import { MedicineContext } from '../context/medicine/MedicineContext'
import { ScreenTemplate } from './ScreenTemplate'

export const MedicinesListScreen = () => {

  const { loadMedicines, isLoading, medicineState } = useContext( MedicineContext )
  const { medicines } = medicineState

  useEffect(() => {
    loadMedicines()
  }, [])

  return (
    <ScreenTemplate>
      {
        isLoading
          ? ( <CustomActivityIndicator /> )
          : (
            <View>
                {
                  medicines && (
                    medicines.map( med => (
                      <Text key={ med.id }>{ med.name } { med.ch }</Text>
                    ))
                  )
                }
                <Text>MedicinesListScreen</Text>
            </View>
          )
      }
    </ScreenTemplate>
  )
}
