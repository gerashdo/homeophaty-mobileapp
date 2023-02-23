import React from 'react'
import { StyleProp, Text, TextStyle, TouchableOpacity } from 'react-native'

interface Props {
    text: string;
    backgroundColor: string;
    textStyle?: StyleProp<TextStyle>;
    onPress?: () => void;
}

export const OptionTab = ({ text, backgroundColor, textStyle = {}, onPress }:Props) => {
  return (
    <TouchableOpacity
        style={{
            flex: 1,
            paddingVertical: 10,
            backgroundColor,
        }}

        activeOpacity={ 1 }
        onPress={ onPress }
    >
        <Text
            style={{
                textAlign: 'center',
                ...textStyle as any,
            }}
        >{ text }</Text>
    </TouchableOpacity>
  )
}
