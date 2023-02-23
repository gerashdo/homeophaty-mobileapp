import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { HighOrderComponent } from '../interfaces/common'

interface Props extends HighOrderComponent {
    style?: StyleProp<ViewStyle>;
}

export const InputGroup = ({ children, style = {} }:Props) => {
    return (
        <View
            style={[ styles.container, style ]}
        >
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    }
})

