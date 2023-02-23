import React, { useContext } from 'react'
import { View } from 'react-native'
import { ThemeContext } from '../context/theme/ThemeContext';
import { appStyles } from '../theme/appTheme';
import { SelectOption } from './SelectOption';

type Option = string | number

interface Props {
    options: Option[];
    value: Option;
    onValueSelected: ( selected: Option ) => void;
}

export const SelectSquareOptions = ({ options, value, onValueSelected }:Props) => {

    const { theme: { colors, elementsBackground, buttonTextColor } } = useContext( ThemeContext )

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
        }}>
            {
                options.map( option => (
                    <SelectOption 
                        key={ option } 
                        option={ option }
                        backgroundColor={
                            value === option
                                ? colors.primary
                                : elementsBackground
                        }
                        textStyle={{
                            ...appStyles.regularText,
                            color: ( value === option ) 
                                ? buttonTextColor
                                : colors.text,
                        }}
                        onPress={ onValueSelected }
                    />
                ))
            }
        </View>
    )
}
