import React, { useContext } from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { ThemeContext } from '../context/theme/ThemeContext'

interface Props {
    iconName: string;
    textColor?: string; 
    style?: StyleProp<ViewStyle>
}

export const FabButton = ({ iconName, textColor, style }:Props) => {
    const { theme: { buttonTextColor, colors }} = useContext( ThemeContext )

    return (
        <TouchableOpacity
            style={[{
                backgroundColor: colors.primary,
                borderRadius: 100,
                position: 'absolute',
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                bottom: 50,
                right: 40,
                zIndex: 999,
            }, style ]}
            activeOpacity={ 0.8 }
        >
            <Icon name={ iconName } color={ textColor || buttonTextColor } size={ 40 }/>
        </TouchableOpacity>
    )
}
