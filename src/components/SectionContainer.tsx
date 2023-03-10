import React, { useContext } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { ThemeContext } from '../context/theme/ThemeContext'
import { HighOrderComponent } from '../interfaces/common'

interface Props extends HighOrderComponent {
    style?: StyleProp<ViewStyle>;
}

export const SectionContainer = ({ children, style }:Props) => {

    const { theme:{ elementsBackground }} = useContext( ThemeContext )

    return (
        <View
            style={[ 
                styles.container,
                {
                    backgroundColor: elementsBackground,
                    marginVertical: 10,
                },
                style
            ]}
        >
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 25,
        paddingVertical: 20,
        borderRadius: 20,
    },
})
