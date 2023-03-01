import React, { useCallback, useContext, useMemo, useRef } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'

import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import { MedicineType, Medicine } from '../interfaces/medicine';
import { InnerMedicinesDetailsList } from '../components/medicine/InnerMedicinesDetailsList'
import { appStyles } from '../theme/appTheme'
import { ThemeContext } from '../context/theme/ThemeContext'
import { SectionContainer } from '../components/SectionContainer';
import { FabButton } from '../components/FabButton';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SimpleButtonWithLogo } from '../components/SimpleButtonWithLogo';
import { NewMedicinePrescriptionForm } from '../components/medicine/NewMedicinePrescriptionForm';

interface Props extends StackScreenProps<MedicinesRootStackParamList,'MedicineScreen'>{}

export const MedicineScreen = ({ route }:Props) => {
  const { medicine } = route.params

  const { theme: { colors }} = useContext( ThemeContext )


  // Modal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => [ '30%', '65%', '90%', '99%' ], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    // setIsModalOpen( true )
  }, []);

  const handleCloseModal = useCallback( () => {
      bottomSheetModalRef.current?.close()
      // setIsModalOpen( false )
  }, [])

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

          <View style={[ styles.titleContainer ]}>
            <Text style={[ appStyles.title, {
              color: colors.text,
            }]}>{medicine.name}</Text>
            {
              medicine.type === MedicineType.MEDICINE && (
                <Text style={[ appStyles.subTitle, {
                  color: colors.text,
                }]}>{ medicine.ch } ch</Text>
              )
            }
          </View>

          <View style={[ appStyles.globalMargin ]}>
            {
              medicine.type === MedicineType.FORMULA && (
                <>
                  <InnerMedicinesDetailsList medicine={ medicine }/>
                </>
              )
            }
          </View>

          <View style={[ appStyles.globalMargin ]}>
            {
              medicine.prescription?.map( (pres, index) => (
                <SectionContainer key={ index }>
                  <Text style={[ appStyles.regularText, {
                    color: colors.text
                  }]}>{ pres.description }</Text>
                </SectionContainer>
              ))
            }
          </View>

        <FabButton 
          iconName='add'
          onPress={ handlePresentModalPress }
        />

        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 30,}}
            onDismiss={ handleCloseModal }
        >
        <View style={{ flex: 1, }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <SimpleButtonWithLogo 
                    text='Cancelar'
                    onPress={ handleCloseModal }
                />
                <SimpleButtonWithLogo 
                    text='Guardar'
                    onPress={ handleCloseModal }
                />
            </View>
            <View style={[ appStyles.globalMargin, { 
              marginTop: 20, 
              flex: 1,
            }]}>
                <NewMedicinePrescriptionForm />
            </View>
        </View>
        </BottomSheetModal>
          
      </KeyboardAvoidingView>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  }
})
