import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { ThemeContext } from '../context/theme/ThemeContext';
import { appStyles } from '../theme/appTheme';

interface Props {
    message: string;
}

export const EmptyScreenMessage = ({ message }:Props) => {

    const { theme:{ softTextColor }} = useContext( ThemeContext )

    return (
        <View style={{ 
            flex: 1, 
            justifyContent: 'center' 
        }}>
            <Text style={[ appStyles.regularText ,{
                textAlign: 'center',
                color: softTextColor,
                bottom: 30,
            }]}>{ message }</Text>
        </View>
    )
}
