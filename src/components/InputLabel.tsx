import React, { useContext } from 'react'
import { StyleSheet, Text } from 'react-native'
import { ThemeContext } from '../context/theme/ThemeContext';
import { appStyles } from '../theme/appTheme'

interface Props {
    text: string;
}

export const InputLabel = ({ text }:Props) => {
    const { theme: { colors } } = useContext( ThemeContext )
    return (
        <Text
            style={{
                ...appStyles.regularText,
                ...styles.labelText,
                color: colors.text,
            }}
        >{ text }</Text>
    )
}

const styles = StyleSheet.create({
    labelText: {
        fontSize: 18,
    },
})
