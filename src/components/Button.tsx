import React, { useContext } from 'react'
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { ThemeContext } from '../context/theme/ThemeContext'

interface Props {
    text: string,
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

export const Button = ({ text, onPress, style }:Props) => {
    const { theme: { colors, buttonTextColor } } = useContext( ThemeContext )
    return (
        <View>
            <TouchableOpacity
                style={[{
                    backgroundColor: colors.primary,
                }, styles.mainButton, style ]}
                activeOpacity={ 0.8 }
                onPress={ onPress }
            >
                <Text
                    style={{
                        color: buttonTextColor,
                        ...styles.buttonText
                    }}
                >{ text }</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainButton: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500'
    }
})
