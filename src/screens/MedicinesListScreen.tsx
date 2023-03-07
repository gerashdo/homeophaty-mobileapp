import React, { useContext, useEffect, useState } from 'react'
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
import { useMedicines, useSearch } from '../hooks/useMedicines'
import { useBoundStore } from '../store/useBoundStore';

interface Props extends StackScreenProps<MedicinesRootStackParamList, 'MedicinesListScreen'>{}

export const MedicinesListScreen = ({ navigation }:Props) => {

  const { theme: { colors, buttonTextColor } } = useContext( ThemeContext )
  const [ searchTermn, setSearchTermn ] = useState('')
  const { searchQuery } = useSearch( searchTermn, 'medicines' )
  const { medicinesQuery } = useMedicines()
  const { medicines: medicinesStore } = useBoundStore()
  const [ medicines, setMedicines ] = useState<Medicine[]>( medicinesStore )

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

  useEffect(() => {
    if( searchTermn ){
      setMedicines( searchQuery.data?.result || [] )
    }else{
      setMedicines( medicinesStore )
    }
  }, [ medicinesStore, searchTermn, searchQuery.data ])
  
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
                searchQuery.isLoading && searchTermn
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
