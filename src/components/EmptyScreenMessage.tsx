import React, { useContext } from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'
import { ThemeContext } from '../context/theme/ThemeContext';
import { appStyles } from '../theme/appTheme';

interface Props {
    message: string;
    style?: StyleProp<ViewStyle>;
}

export const EmptyScreenMessage = ({ message, style }:Props) => {

    const { theme:{ softTextColor }} = useContext( ThemeContext )

    return (
        <View style={[{ 
            flex: 1, 
            justifyContent: 'center',
            minHeight: 100,
        }, style ]}>
            <Text style={[ appStyles.regularText ,{
                textAlign: 'center',
                color: softTextColor,
                bottom: 30,
            }]}>{ message }</Text>
        </View>
    )
}
