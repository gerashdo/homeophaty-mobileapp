import React, { useEffect } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { useAnimation } from '../hooks/useAnimation'

interface Props {
    message: string;
}

export const Toast = ({ message }:Props) => {
    const { opacity, fadeIn, fadeOut } = useAnimation()

    useEffect(() => {
        fadeIn()
        setTimeout( () => {
            fadeOut()
        }, 7500)
    }, [])

    return (
        <Animated.View
            style={{
                ...styles.container,
                opacity,
                
            }}
        >
            <View style={{
                ...styles.toastContainer 
            }}>
                <Text style={{
                    ...styles.toastText,
                }}>
                    { message }
                </Text>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    toastContainer: {
        width: '70%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 35,
    },
    toastText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
    }
})
