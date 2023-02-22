import React from 'react'
import { TextInput } from 'react-native'
import { appStyles } from '../theme/appTheme'
import { InputContainer } from './InputContainer'
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    onSearch: ( value: string ) => void;
    textColor: string,
}

export const SearchInput = ({ onSearch, textColor }:Props) => {

    const [ searchValue, setSearchValue ] = useState('')

    return (
        <InputContainer
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 30,
            }}
        >
            <TextInput
                style={{
                    ...appStyles.regularText,
                }} 
                placeholder='Abrotanum 30'
                autoCapitalize='words'
                value={ searchValue }
                onChangeText={ ( text ) => setSearchValue( text )}
            />
            <Icon 
                name='search'
                color={ textColor }
                size={ 30 }
            />
        </InputContainer>
    )
}
