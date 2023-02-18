import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Text, View } from 'react-native'

export const LoginScreen = () => {
    const navigator = useNavigation()
  return (
    <View style={{ flex: 1 }}>
        <Text>LoginScreen</Text>
        <Icon name="rocket" size={50} color="#900" />
        <Button 
            title='Iniciar sesion'
            onPress={ () => navigator.navigate('BottomNavigator' as never)}
        />
    </View>
  )
}
