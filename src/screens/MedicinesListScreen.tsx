import React, { useContext, useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { View } from 'react-native'

import { CustomActivityIndicator } from '../components/ActivityIndicator'
import { MedicinesList } from '../components/medicine/MedicinesList'
import { SearchInput } from '../components/SearchInput'
import { SimpleButtonWithLogo } from '../components/SimpleButtonWithLogo'
import { ThemeContext } from '../context/theme/ThemeContext'
import { useSearch } from '../hooks/useSearch'
import { Medicine } from '../interfaces/medicine'
import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import { appStyles } from '../theme/appTheme'
import { ScreenTemplate } from './ScreenTemplate'
import { useMedicines } from '../hooks/useMedicines'
import { useBoundStore } from '../store/useBoundStore';

interface Props extends StackScreenProps<MedicinesRootStackParamList, 'MedicinesListScreen'>{}

export const MedicinesListScreen = ({ navigation }:Props) => {

  const { theme: { colors, buttonTextColor } } = useContext( ThemeContext )
  const { medicinesQuery } = useMedicines()
  const { medicines } = useBoundStore()
  const { 
    isLoading: isLoadingSearch, 
    valuesFound, 
    search 
  } = useSearch('medicines', medicines )

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <SimpleButtonWithLogo 
        iconName='add'
        text='Nuevo'
        color={ buttonTextColor }
        backgroundColor={ colors.primary }
        onPress={ () => navigation.navigate( 'NewMedicineScreen', { medicine: null } ) }
      />,
      title: ''
    })
  }, [])
  

  if( medicinesQuery.isLoading ) return <CustomActivityIndicator />
  
  const onItemPress = ( item: Medicine ) => {
    navigation.navigate('MedicineScreen', { medicine: item })
  }

  const onItemEdit = ( item: Medicine ) => {
    navigation.navigate('NewMedicineScreen', { medicine: item } )
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
        medicinesQuery.isLoading
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
                      // data={ valuesFound.length > 0 ? valuesFound : medicines } 
                      data={ medicines } 
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
