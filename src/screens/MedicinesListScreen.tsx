import React, { useContext, useEffect, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { View } from 'react-native'

import { CustomActivityIndicator } from '../components/ActivityIndicator'
import { MedicinesInfinityList } from '../components/medicine/MedicinesInfinityList'
import { SearchInput } from '../components/SearchInput'
import { SimpleButtonWithLogo } from '../components/SimpleButtonWithLogo'
import { ThemeContext } from '../context/theme/ThemeContext'
import { Medicine } from '../interfaces/medicine'
import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import { appStyles } from '../theme/appTheme'
import { ScreenTemplate } from './ScreenTemplate'
import { useMedicinesSearch } from '../hooks/useMedicinesSearch'
import { useDeleteMedicine, useMedicines } from '../hooks/useMedicines'
import { AlertModal } from '../components/AlertModal'
import { OverLayerScreenButton } from '../components/OverLayerScreenButton'

interface Props extends StackScreenProps<MedicinesRootStackParamList, 'MedicinesListScreen'>{}

export const MedicinesListScreen = ({ navigation }:Props) => {

  const { theme: { colors, buttonTextColor, danger } } = useContext( ThemeContext )
  // First load the medicines list to be setted in the store
  const { medicinesQuery } = useMedicines()
  const { deleteMedicineMutation } = useDeleteMedicine()
  const [ modalVisible, setModalVisible ] = useState( false )
  const [ medicineToDelete, setMedicineToDelete ] = useState<Medicine | null >( null )

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

  const onItemDelete = ( medicine: Medicine ) => {
    setMedicineToDelete( medicine )
    setModalVisible( true )
  }

  const onCancelDelete = () => {
    setModalVisible( false )
    setMedicineToDelete( null )
  }

  const handleDeleteMedicine = async() => {
    if( !medicineToDelete ) return 
    await deleteMedicineMutation.mutateAsync( medicineToDelete._id )
    onCancelDelete()
  }

  const handleLoadNextMedicinesPage = () => {
    if( !medicinesQuery.hasNextPage ) return
    medicinesQuery.fetchNextPage()
  }
  
  return (
    <ScreenTemplate>
      {
        medicinesQuery.isLoading
          ? ( <CustomActivityIndicator /> )
          : (
            <>
              <>
                {
                  modalVisible && ( <OverLayerScreenButton onPress={ onCancelDelete } /> )
                }
              </>
              <View style={{ flex: 1, }}>
                <View style={ appStyles.globalMargin }>
                  <SearchInput 
                    onSearch={ ( value ) => setSearchTermn( value ) }
                  />
                </View>
                {
                  isLoading && searchTermn
                    ? ( <CustomActivityIndicator />  )
                    : ( 
                      <MedicinesInfinityList
                        data={ medicines } 
                        onItemPress={ onItemPress }
                        onItemEdit={ onItemEdit }
                        onItemDelete={ onItemDelete }
                        onEndReached={ handleLoadNextMedicinesPage }
                        isLoading={ medicinesQuery.isFetchingNextPage }
                      />
                    )
                }
                <AlertModal 
                  visible={ modalVisible }
                  message='Estas seguro de eliminar este medicamento?'
                  acceptMessage='Si, eliminar medicamento'
                  acceptColor={ danger }
                  onCancel={ onCancelDelete }
                  onAccept={ handleDeleteMedicine }
                />
              </View>
            </>
          )
      }
    </ScreenTemplate>
  )
}
