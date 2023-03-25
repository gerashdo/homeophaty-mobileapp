import React, { useContext } from 'react'
import { View } from 'react-native'
import { Button } from '../components/Button'
import { AuthContext } from '../context/auth/AuthContext'
import { appStyles } from '../theme/appTheme'
import { ScreenTemplate } from './ScreenTemplate'

export const ProfileScreen = () => {

  const { logout } = useContext( AuthContext )

  return (
    <ScreenTemplate>
      <View style={[ appStyles.globalMargin, { 
        flex: 1,
        justifyContent: 'space-between', 
      } ]}>
        <></>
        <Button 
          text='Cerrar sesión'
          onPress={ logout }
          style={{
            position: 'absolute',
            bottom: 50,
            width: '100%',
          }}
        />
      </View>
    </ScreenTemplate>
  )
}