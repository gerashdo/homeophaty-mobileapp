import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ThemeContext } from '../context/theme/ThemeContext'

interface Props {
    text: string,
}

export const Button = ({ text }:Props) => {
    const { theme: { colors, buttonTextColor } } = useContext( ThemeContext )
    return (
        <View>
            <TouchableOpacity
                style={{
                    backgroundColor: colors.primary,
                    ...styles.mainButton
                }}
                activeOpacity={ 0.8 }
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
