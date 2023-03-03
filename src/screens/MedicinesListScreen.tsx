import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import { CustomActivityIndicator } from '../components/ActivityIndicator'
import { MedicinesList } from '../components/medicine/MedicinesList'
import { SearchInput } from '../components/SearchInput'
import { SimpleButtonWithLogo } from '../components/SimpleButtonWithLogo'
import { MedicineContext } from '../context/medicine/MedicineContext'
import { ThemeContext } from '../context/theme/ThemeContext'
import { useSearch } from '../hooks/useSearch'
import { Medicine } from '../interfaces/medicine'
import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import { appStyles } from '../theme/appTheme'
import { ScreenTemplate } from './ScreenTemplate'

interface Props extends StackScreenProps<MedicinesRootStackParamList, 'MedicinesListScreen'>{}

export const MedicinesListScreen = ({ navigation }:Props) => {
  const { loadMedicines, isLoading, medicineState } = useContext( MedicineContext )
  const { theme: { colors, buttonTextColor } } = useContext( ThemeContext )
  
  const { medicines } = medicineState
  console.log( JSON.stringify( medicines, null, 4 ))
  
  const { 
    isLoading: isLoadingSearch, 
    valuesFound, 
    search 
  } = useSearch('medicines', medicines )

  useEffect(() => {
    loadMedicines()
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <SimpleButtonWithLogo 
        iconName='add'
        text='Nuevo'
        color={ buttonTextColor }
        backgroundColor={ colors.primary }
        onPress={ () => navigation.navigate( 'NewMedicineScreen' ) }
      />,
      title: ''
    })
  }, [])

  const onItemPress = ( item: Medicine ) => {
    navigation.navigate('MedicineScreen', { medicine: item })
  }

  const onItemEdit = ( item: Medicine ) => {
    navigation.navigate('NewMedicineScreen')
  }

  const handleSearch = ( searchValue: string ) => {
    search( searchValue )
  }
  
  // TODO: Implementar la busqueda en el backend
  return (
    <ScreenTemplate
      style={{
        // ...appStyles.globalMargin,
      }}
    >
      {
        isLoading
          ? ( <CustomActivityIndicator /> )
          : (
            <View style={{ flex: 1, }}>
              <View style={ appStyles.globalMargin }>
                <SearchInput 
                  onSearch={ handleSearch }
                  textColor={ colors.text }
                />
              </View>
              {
                isLoadingSearch
                  ? ( <CustomActivityIndicator />  )
                  : ( 
                    <MedicinesList 
                      data={ valuesFound.length > 0 ? valuesFound : medicines } 
                      onItemPress={ onItemPress }
                      onItemEdit={ onItemEdit }
                    />
                  )
              }
            </View>
          )
      }
    </ScreenTemplate>
  )
}
