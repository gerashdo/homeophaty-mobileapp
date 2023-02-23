import React from 'react'
import { StyleProp, Text, TextStyle, TouchableOpacity } from 'react-native'

interface Props {
    text: string,
    backgroundColor: string;
    textStyle?: StyleProp<TextStyle>;
}

export const OptionTab = ({ text, backgroundColor, textStyle = {} }:Props) => {
  return (
    <TouchableOpacity
        style={{
            flex: 1,
            paddingVertical: 10,
            backgroundColor,
        }}

        activeOpacity={ 1 }
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
