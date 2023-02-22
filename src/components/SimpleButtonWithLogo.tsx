import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { appStyles } from '../theme/appTheme';

interface Props {
    text?: string;
    iconName?: string;
    color?: string;
    backgroundColor?: string;
}

export const SimpleButtonWithLogo = ({ 
    text, 
    iconName, 
    color='gray', 
    backgroundColor = 'white' 
}:Props) => {

    return (
        <TouchableOpacity
            style={{
                ...appStyles.globalMargin,
                ...styles.container,
            }}
            activeOpacity={ 0.9 }
        >
            {
                text && (
                    <Text style={{
                        ...styles.text,
                        color: backgroundColor,
                    }}>
                        { text }
                    </Text>
                )
            }

            {
                iconName && (
                    <View style={{
                        ...styles.iconContainer,
                        backgroundColor,
                    }}>
                        <Icon 
                        name={ iconName }
                        size={ 25 }
                        color={ color }
                        />
                    </View>
                )
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
    iconContainer: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingLeft: 2,
    },
    text:{
        fontWeight: 'bold',
        marginRight: 5,
        fontSize: 16,
    }
})
