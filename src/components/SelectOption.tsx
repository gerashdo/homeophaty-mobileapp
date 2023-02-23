
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TextStyle, StyleProp } from 'react-native';

interface Props {
    option: string;
    backgroundColor?: string;
    textStyle?: StyleProp<TextStyle>;
    onPress?: ( optionSelected: string ) => void;
}

export const SelectOption = ({ 
    option, 
    backgroundColor = 'white', 
    textStyle = {},
    onPress = () => {},
}:Props) => {

    return (
        <TouchableOpacity 
            style={{ 
                ...styles.container,
                backgroundColor,
            }}
            activeOpacity={ 1 }
            onPress={ () => onPress( option )}
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
