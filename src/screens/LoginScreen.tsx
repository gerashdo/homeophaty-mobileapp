import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, Text, View } from 'react-native'

export const LoginScreen = () => {
    const navigator = useNavigation()
  return (
    <View style={{ flex: 1 }}>
        <Text>LoginScreen</Text>
        <Button 
            title='Iniciar sesion'
            onPress={ () => navigator.navigate('BottomNavigator' as never)}
        />
    </View>
  )
}
