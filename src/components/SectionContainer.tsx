import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { ThemeContext } from '../context/theme/ThemeContext'
import { HighOrderComponent } from '../interfaces/common'

export const SectionContainer = ({ children }:HighOrderComponent) => {

    const { theme:{ elementsBackground }} = useContext( ThemeContext )

    return (
        <View
            style={[ 
                styles.container,
                {
                    backgroundColor: elementsBackground,
                }
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
