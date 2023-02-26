import React, { useContext } from 'react'
import { View } from 'react-native'
import { HighOrderComponent } from '../interfaces/common';
import { appStyles } from '../theme/appTheme';
import { ThemeContext } from '../context/theme/ThemeContext';

export const SwapListHiddenItems = ({ children }: HighOrderComponent) => {

    const { theme:{ softTextColor }} = useContext( ThemeContext )

    return (
        <View style={[ appStyles.globalMargin ,{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 10,
            marginVertical: 5,
            marginHorizontal: 20,
            overflow: 'hidden',
            backgroundColor: softTextColor,
        }]}>
            { children }
        </View>
    )
}
