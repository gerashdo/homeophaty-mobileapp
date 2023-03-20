import React from 'react'
import { useWindowDimensions } from 'react-native'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'

interface Props {
    onPress?: () => void;
}

export const OverLayerScreenButton = ({ onPress }:Props) => {
    const { height, width } = useWindowDimensions()

    return (
        <TouchableOpacity
            style={[ styles.layer, {
                height,
                width,
            }]}
            activeOpacity={ 1 }
            onPress={ onPress }
        ></TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    layer: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        zIndex: 999,
        position: 'absolute',
    }
})
