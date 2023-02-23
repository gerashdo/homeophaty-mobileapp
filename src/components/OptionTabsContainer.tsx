import React, { useContext } from 'react'
import { View } from 'react-native'
import { ThemeContext } from '../context/theme/ThemeContext'
import { HighOrderComponent } from '../interfaces/common'

export const OptionTabsContainer = ({ children }:HighOrderComponent) => {

    const { theme:{ colors }} = useContext( ThemeContext )

  return (
    <View
        style={{
            backgroundColor: 'white',
            borderRadius: 10,
            flexDirection: 'row',
            borderColor: colors.primary,
            borderWidth: 2,
            marginVertical: 10,
            overflow: 'hidden',
        }}
    >
        { children }
    </View>
  )
}
