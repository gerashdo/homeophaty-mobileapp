
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    iconName: string;
    backgroundColor: string;
    iconColor?: string;
    onPress?: () => void; 
}

export const SwapListHiddenButton = ({ 
    iconName, 
    backgroundColor, 
    iconColor = 'white',
    onPress = () => {}, 
}: Props) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor,
                height: '100%',
                width: 80,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            activeOpacity={ 0.9 }
            onPress={ onPress }
        >
            <Icon 
                name={ iconName }
                size={ 25 }
                color={ iconColor }
            />
        </TouchableOpacity>
    )
}
