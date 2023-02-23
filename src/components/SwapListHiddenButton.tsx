
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    iconName: string;
    backgroundColor: string;
    iconColor?: string;
}

export const SwapListHiddenButton = ({ iconName, backgroundColor, iconColor = 'white' }: Props) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor,
                height: '100%',
                width: 60,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            activeOpacity={ 0.9 }
        >
            <Icon 
                name={ iconName }
                size={ 25 }
                color={ iconColor }
            />
        </TouchableOpacity>
    )
}
