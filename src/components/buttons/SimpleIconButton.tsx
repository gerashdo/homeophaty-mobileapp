import React from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

interface Props {
    iconColor?: string;
    iconName: string;
    iconSize?: number;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

export const SimpleIconButton = ({ iconColor, iconSize, iconName, style, onPress }:Props) => {
  return (
    <TouchableOpacity
        activeOpacity={ 0.8 }
        style={[ style ]}
        onPress={ onPress }
    >
        <Icon 
            name={ iconName } 
            size={ iconSize ? iconSize : 30 } 
            color={ iconColor ? iconColor : 'black' } 
        />
    </TouchableOpacity>
  )
}
