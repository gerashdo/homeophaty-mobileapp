import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { CustomActivityIndicator } from '../components/ActivityIndicator'
import { MedicineListItem } from '../components/medicine/MedicineListItem'
import { MedicinesList } from '../components/medicine/MedicinesList'
import { SearchInput } from '../components/SearchInput'
import { SimpleButtonWithLogo } from '../components/SimpleButtonWithLogo'
import { MedicineContext } from '../context/medicine/MedicineContext'
import { ThemeContext } from '../context/theme/ThemeContext'
import { Medicine } from '../interfaces/medicine'
import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import { appStyles } from '../theme/appTheme'
import { ScreenTemplate } from './ScreenTemplate'

interface Props extends StackScreenProps<MedicinesRootStackParamList, 'MedicinesListScreen'>{}

export const MedicinesListScreen = ({ navigation }:Props) => {

  const { loadMedicines, isLoading, medicineState } = useContext( MedicineContext )
  const { theme: { colors, buttonTextColor } } = useContext( ThemeContext )

  const { medicines } = medicineState

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

  const onItemPress = ( item?: Medicine ) => {
    if( !item ) return 
    navigation.navigate('MedicineScreen')
  }

  const onItemEdit = ( item: Medicine ) => {
    navigation.navigate('MedicineScreen')
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
                  onSearch={ () => console.log('hey') }
                  textColor={ colors.text }
                />
              </View>
              <MedicinesList 
                data={ medicines } 
                onItemPress={ onItemPress }
                onItemEdit={ onItemEdit }
              />
            </View>
          )
      }
    </ScreenTemplate>
  )
}
