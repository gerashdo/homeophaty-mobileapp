
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TextStyle, StyleProp } from 'react-native';

interface Props {
    option: string;
    textStyle?: StyleProp<TextStyle>
}

export const SelectOption = ({ option, textStyle = {} }:Props) => {
    return (
        <TouchableOpacity 
            style={{ 
                ...styles.container,
                backgroundColor: 'white'
            }}
            activeOpacity={ 1 }
        >
            <Text
                style={[ styles.text, textStyle ]}
            >
                { option }
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
    },
    text: {

    }
})
