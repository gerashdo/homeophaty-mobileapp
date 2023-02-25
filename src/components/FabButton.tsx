import React, { useContext } from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { ThemeContext } from '../context/theme/ThemeContext'

interface Props {
    iconName: string;
    textColor?: string; 
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

export const FabButton = ({ iconName, textColor, style, onPress }:Props) => {
    const { theme: { buttonTextColor, colors }} = useContext( ThemeContext )

    return (
        <TouchableOpacity
            style={[ styles.button ,{
                backgroundColor: colors.primary,
            }, style ]}
            activeOpacity={ 0.9 }
            onPress={ onPress }
        >
            <Icon name={ iconName } color={ textColor || buttonTextColor } size={ 35 }/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 100,
        position: 'absolute',
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 50,
        right: 40,
        zIndex: 999,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }
})
