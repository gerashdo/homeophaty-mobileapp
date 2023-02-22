import React, { useContext, useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { CustomActivityIndicator } from '../components/ActivityIndicator'
import { MedicineListItem } from '../components/medicine/MedicineListItem'
import { SearchInput } from '../components/SearchInput'
import { MedicineContext } from '../context/medicine/MedicineContext'
import { ThemeContext } from '../context/theme/ThemeContext'
import { ScreenTemplate } from './ScreenTemplate'

export const MedicinesListScreen = () => {

  const { loadMedicines, isLoading, medicineState } = useContext( MedicineContext )
  const { theme: { colors } } = useContext( ThemeContext )

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
              <SearchInput 
                onSearch={ () => console.log('hey') }
                textColor={ colors.text }
              />
              <FlatList 
                data={ medicines }
                renderItem={ ({ item }) => (
                  <MedicineListItem key={ item.id } medicine={ item }/>
                )}
                keyExtractor={ item => item.id }
                ItemSeparatorComponent={ () => <View style={{ marginVertical: 10 }}/> }
              />
            </View>
          )
      }
    </ScreenTemplate>
  )
}
