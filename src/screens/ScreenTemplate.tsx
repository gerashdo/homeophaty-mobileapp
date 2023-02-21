import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HighOrderComponent } from '../interfaces/common';


export const ScreenTemplate = ({ children }: HighOrderComponent) => {
    const { top } = useSafeAreaInsets()

    return (
        <View style={{
            flex: 1,
            marginTop: top
        }}>
            { children }

        </View>
    )
}
