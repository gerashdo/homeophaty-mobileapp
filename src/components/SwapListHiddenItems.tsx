import React, { useContext } from 'react'
import { View } from 'react-native'
import { ThemeContext } from '../context/theme/ThemeContext';
import { SwapListHiddenButton } from './SwapListHiddenButton';

export const SwapListHiddenItems = () => {

    const { theme:{ secondary, danger }} = useContext( ThemeContext )

    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 10,
            marginVertical: 5,
            marginHorizontal: 6,
            overflow: 'hidden',
        }}>
            <View />
            <View style={{
                flexDirection: 'row-reverse'
            }}>
                <SwapListHiddenButton 
                    iconName='trash'
                    backgroundColor={ danger }
                />
                <SwapListHiddenButton 
                    iconName='create'
                    backgroundColor={ secondary }
                />
            </View>
        </View>
    )
}
