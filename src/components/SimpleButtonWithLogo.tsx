import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/theme/ThemeContext';
import { appStyles } from '../theme/appTheme';

interface Props {
    text?: string;
    iconName?: string;
    color?: string;
    backgroundColor?: string;
    onPress?: () => void;
}

export const SimpleButtonWithLogo = ({ 
    text, 
    iconName, 
    color='gray', 
    backgroundColor = 'white',
    onPress = () => {},
}:Props) => {

    const { theme:{ colors, buttonTextColor }} = useContext( ThemeContext )

    return (
        <TouchableOpacity
            style={{
                ...appStyles.globalMargin,
                ...styles.container,
            }}
            activeOpacity={ 0.9 }
            onPress={ onPress }
        >
            {
                text && (
                    <Text style={{
                        ...styles.text,
                        color: (backgroundColor !== 'white')
                            ? backgroundColor : colors.primary ,
                    }}>
                        { text }
                    </Text>
                )
            }

            {
                iconName && (
                    <View style={{
                        ...styles.iconContainer,
                        backgroundColor: (backgroundColor !== 'white')
                            ? backgroundColor : colors.primary ,
                    }}>
                        <Icon 
                            name={ iconName }
                            size={ 20 }
                            color={ (color !== 'gray' )
                                ? color : buttonTextColor
                            }
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
