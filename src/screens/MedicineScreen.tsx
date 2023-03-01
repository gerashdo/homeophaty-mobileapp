import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Text, View } from 'react-native'

import { MedicinesRootStackParamList } from '../navigators/MedicinesStackNavigator'

interface Props extends StackScreenProps<MedicinesRootStackParamList,'MedicineScreen'>{}

export const MedicineScreen = ({ route }:Props) => {

  const { medicine } = route.params

  return (
    <View>
        <Text>{medicine.name}</Text>
    </View>
  )
}
