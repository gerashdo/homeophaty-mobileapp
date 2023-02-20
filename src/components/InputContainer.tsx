import React, { useContext } from "react"
import { Platform, StyleSheet, View } from "react-native"
import { ThemeContext } from "../context/theme/ThemeContext"

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const InputContainer = ({ children }:Props) => {
    const { theme: { colors } } = useContext( ThemeContext )
    return (
        <View
            style={{
                ...styles.container,
                borderColor: colors.border,
            }}
        >
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: Platform.OS === 'ios' ? 15 : 5,
        marginVertical: 10,
    }
})