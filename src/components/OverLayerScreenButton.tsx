import React, { useContext } from 'react'
import { useWindowDimensions } from 'react-native'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { ThemeContext } from '../context/theme/ThemeContext';

interface Props {
    onPress?: () => void;
}

export const OverLayerScreenButton = ({ onPress }:Props) => {
    const { height, width } = useWindowDimensions()
    const { theme:{ overlay }} = useContext( ThemeContext )

    return (
        <TouchableOpacity
            style={[ styles.layer, {
                height,
                width,
                backgroundColor: overlay
            }]}
            activeOpacity={ 1 }
            onPress={ onPress }
        ></TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    layer: {
        zIndex: 999,
        position: 'absolute',
    }
})
