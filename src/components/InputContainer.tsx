import React, { useContext } from "react"
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { ThemeContext } from "../context/theme/ThemeContext"
import { HighOrderComponent } from "../interfaces/common";

interface Props extends HighOrderComponent {
    style?: StyleProp<ViewStyle>
}

export const InputContainer = ({ children, style = {} }:Props) => {
    const { theme: { colors, elementsBackground } } = useContext( ThemeContext )
    return (
        <View
            style={{
                ...styles.container,
                borderColor: colors.border,
                backgroundColor: elementsBackground,
                ...style as any,
            }}
        >
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: Platform.OS === 'ios' ? 12 : 2,
        marginVertical: 10,
    }
})