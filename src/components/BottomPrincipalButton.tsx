import React, { useContext } from 'react'
import { ViewStyle } from 'react-native';
import { StyleProp } from 'react-native';
import { View } from 'react-native'
import { ThemeContext } from '../context/theme/ThemeContext'
import { Button } from './Button'

interface Props {
    text: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export const BottomPrincipalButton = ({ text, onPress, style }:Props) => {

    const { theme: { secondary }} = useContext( ThemeContext )

    return (
        <Button 
            text={ text }
            style={[{
                backgroundColor: secondary,
                position: 'absolute',
                width: '100%',
                bottom: 30,
                alignSelf: 'center',
            }, style ]}
            onPress={ onPress }
        />
    )
}
