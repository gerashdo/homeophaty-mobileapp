import React from 'react'
import { View } from 'react-native'
import { HighOrderComponent } from '../interfaces/common';

export const SwapListHiddenItems = ({ children }: HighOrderComponent) => {
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
            { children }
        </View>
    )
}
