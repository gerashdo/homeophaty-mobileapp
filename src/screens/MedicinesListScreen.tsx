import React, { useContext, useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { View } from 'react-native'

import { CustomActivityIndicator } from '../components/ActivityIndicator'
import { MedicinesList } from '../components/medicine/MedicinesList'
import { SearchInput } from '../components/SearchInput'
import { SimpleButtonWithLogo } from '../components/SimpleButtonWithLogo'
import { ThemeContext } from '../context/theme/ThemeContext'
import { Medicine } from '../interfaces/medicine'
import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import { appStyles } from '../theme/appTheme'
import { ScreenTemplate } from './ScreenTemplate'
import { useMedicinesSearch } from '../hooks/useMedicinesSearch'
import { useMedicines } from '../hooks/useMedicines'

interface Props extends StackScreenProps<MedicinesRootStackParamList, 'MedicinesListScreen'>{}

export const MedicinesListScreen = ({ navigation }:Props) => {

  const { theme: { colors, buttonTextColor } } = useContext( ThemeContext )
  // First load the medicines list to be setted in the store
  const { medicinesQuery } = useMedicines()

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

  const { setSearchTermn, isLoading, searchTermn, medicines } = useMedicinesSearch()

  if( medicinesQuery.isLoading ) return <CustomActivityIndicator />
  
  const onItemPress = ( item: Medicine ) => {
    navigation.navigate('MedicineScreen', { medicine: item })
  }

  const onItemEdit = ( item: Medicine ) => {
    navigation.navigate('NewMedicineScreen', { medicine: item } )
  }
  
  return (
    <ScreenTemplate>
      {
        medicinesQuery.isLoading
          ? ( <CustomActivityIndicator /> )
          : (
            <View style={{ flex: 1, }}>
              <View style={ appStyles.globalMargin }>
                <SearchInput 
                  onSearch={ ( value ) => setSearchTermn( value ) }
                  textColor={ colors.text }
                />
              </View>
              {
                isLoading && searchTermn
                  ? ( <CustomActivityIndicator />  )
                  : ( 
                    <MedicinesList
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
