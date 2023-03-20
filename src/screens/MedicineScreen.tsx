import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import { FabButton } from '../components/FabButton';
import { SimpleButtonWithLogo } from '../components/SimpleButtonWithLogo';
import { useMedicine } from '../hooks/useMedicines';
import { CustomActivityIndicator } from '../components/ActivityIndicator';
import { MedicineDetails } from '../components/medicine/MedicineDetails';
import { MedicineDetailsHeader } from '../components/medicine/MedicineDetailsHeader';
import { useCustomBottomSheetModal } from '../hooks/useCustomBottomSheetModal'
import { Button } from '../components/Button'
import { ThemeContext } from '../context/theme/ThemeContext'
import { useIsFocused } from '@react-navigation/native'
import { OverLayerScreenButton } from '../components/OverLayerScreenButton'
import { AlertModal } from '../components/AlertModal'

interface Props extends StackScreenProps<MedicinesRootStackParamList,'MedicineScreen'>{}

export const MedicineScreen = ({ navigation, route }:Props) => {
  const { medicine: medicineParam } = route.params

  const isScreenFocused = useIsFocused()
  const { theme: { danger }} = useContext( ThemeContext )
  const { medicineQuery } = useMedicine( medicineParam._id )
  const { 
    snapPoints, 
    bottomSheetModalRef, 
    isModalOpen, 
    handlePresentModalPress,
    handleCloseModal,
  } = useCustomBottomSheetModal([ '35%' ])
  const [ modalVisible, setModalVisible ] = useState( false )

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <SimpleButtonWithLogo 
        iconName='pencil' text='Editar' 
        onPress={ () => navigation.navigate( 'NewMedicineScreen', { medicine: medicineParam }) }
      />
    })

    return () => {
      handleCloseModal()
    }
  }, [])

  useEffect( () => {
    if( isScreenFocused ) return 
    handleCloseModal()
  }, [ isScreenFocused ])

  useEffect( () => {
    if( !isModalOpen ) return 
    handlePresentModalPress()
  },[ isModalOpen ] )

  if( medicineQuery.isLoading ) return (
    <View style={{ flex: 1 }}>
      <CustomActivityIndicator />
    </View>
  )
  
  if( medicineQuery.isError ) return navigation.pop()

  const medicine = medicineQuery.data.medicine

  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1 }} >
        <>
          {
            ( isModalOpen || modalVisible ) && ( <OverLayerScreenButton onPress={ handleCloseModal } />)
          }
        </>

        <MedicineDetailsHeader medicine={ medicine } />
        <MedicineDetails medicine={ medicine } />

        <FabButton 
          iconName='add'
          style={{ 
            zIndex: ( isModalOpen ) ? 400 : 999,
          }}
          onPress={ () => navigation.navigate( 'NewPrescriptionScreen', { medicine: medicine || medicineParam } )}
        />  

        <AlertModal 
          message='Deseas eliminar la prescripción?'
          acceptMessage='Si, eliminar la prescripción'
          visible={ modalVisible }
          acceptColor={ danger }
          onCancel={ () => setModalVisible( false ) }
          onAccept={ () => console.log( 'eliminado' )}
        />
      </View>

      <BottomSheetModal
        ref={ bottomSheetModalRef }
        snapPoints={ snapPoints }
        index={ 0 }
        onDismiss={ handleCloseModal }
      >
        <View style={{
          flex: 1,
          gap: 20,
          justifyContent: 'center',
          marginHorizontal: 30,
        }}>
          <Button 
            text='Editar prescripción'
            onPress={ () => navigation.navigate( 'NewPrescriptionScreen', { medicine } ) }
          />
          <Button 
            text='Eliminar prescripción'
            style={{
              backgroundColor: danger
            }}
            onPress={ () => { 
              setModalVisible( true )
              handleCloseModal()
            }}
          />
          <Button 
            text='Cancelar'
            onPress={ handleCloseModal }
          />
        </View>
      </BottomSheetModal>

    </BottomSheetModalProvider>
  )
}


