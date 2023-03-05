import React, { useContext, useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'
import {  MedicineType } from '../interfaces/medicine';
import { InnerMedicinesDetailsList } from '../components/medicine/InnerMedicinesDetailsList'
import { appStyles } from '../theme/appTheme'
import { ThemeContext } from '../context/theme/ThemeContext'
import { SectionContainer } from '../components/SectionContainer';
import { FabButton } from '../components/FabButton';
import { EmptyScreenMessage } from '../components/EmptyScreenMessage';
import { SimpleButtonWithLogo } from '../components/SimpleButtonWithLogo';
import { useMedicine } from '../hooks/useMedicines';
import { CustomActivityIndicator } from '../components/ActivityIndicator';

interface Props extends StackScreenProps<MedicinesRootStackParamList,'MedicineScreen'>{}

export const MedicineScreen = ({ navigation, route }:Props) => {
  const { medicine: medicineParam } = route.params

  const { medicineQuery } = useMedicine( medicineParam._id )
  const { theme: { colors }} = useContext( ThemeContext )
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <SimpleButtonWithLogo 
        iconName='pencil' text='Editar' 
        onPress={ () => navigation.navigate( 'NewMedicineScreen', { medicine: medicineParam }) }
      />
    })
  }, [])

  const { data, isLoading } = medicineQuery
  const medicine = data?.medicine

  if( !medicine && !isLoading ) return navigation.pop()

  return (
    <View 
      style={{ flex: 1 }}
    >
      {
        isLoading 
          ? ( <CustomActivityIndicator /> )
          : (
            <>
              <View style={[ styles.titleContainer ]}>
                <Text style={[ appStyles.title, {
                  color: colors.text,
                }]}>{medicine!.name}</Text>
                {
                  medicine!.type === MedicineType.MEDICINE && (
                    <Text style={[ appStyles.subTitle, {
                      color: colors.text,
                    }]}>{ medicine!.ch } ch</Text>
                  )
                }
              </View>
        
              <ScrollView style={{ flex: 1 }}>
        
                <View style={[ appStyles.globalMargin ]}>
                  {
                    medicine!.type === MedicineType.FORMULA && (
                      <>
                        <InnerMedicinesDetailsList medicine={ medicine || medicineParam }/>
                      </>
                    )
                  }
                </View>
        
                <View style={[ appStyles.globalMargin ]}>
                  {
                    medicine!.prescription?.map( (pres, index) => (
                      <SectionContainer key={ index }>
                        <Text style={[ appStyles.regularText, {
                          color: colors.text
                        }]}>{ pres.description }</Text>
                      </SectionContainer>
                    ))
                  }
                </View>
        
                {
                  medicine!.prescription?.length === 0 && (
                      <EmptyScreenMessage 
                        message='Agrega prescripciones para este medicamento con el boton +'
                        style={[ appStyles.globalMargin, {
                          flexGrow: 1,
                        }]}
                      />
                  )
                }
              </ScrollView>
        
              <FabButton 
                iconName='add'
                onPress={ () => navigation.navigate( 'NewPrescriptionScreen', { medicine: medicine || medicineParam } )}
              />
            </>
          )
      }
    </View>
    
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
