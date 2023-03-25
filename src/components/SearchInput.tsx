import React, { useContext } from 'react'
import { Pressable, TextInput } from 'react-native'
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { appStyles } from '../theme/appTheme'
import { InputContainer } from './InputContainer'
import { useDebouncedValue } from '../hooks/useDebounce';
import { ThemeContext } from '../context/theme/ThemeContext';

interface Props {
    onSearch: ( value: string ) => void;
}

export const SearchInput = ({ onSearch }:Props) => {

    const { theme:{ softTextColor }} = useContext( ThemeContext )
    const [ searchValue, setSearchValue ] = useState('')

    const debouncedValue = useDebouncedValue( searchValue, 600 )

    useEffect(() => {
      onSearch( debouncedValue )
    }, [ debouncedValue ])
    
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
                    flexGrow: 1,
                }} 
                placeholder='Ingreas tu búsqueda'
                placeholderTextColor={ softTextColor }
                autoCapitalize='words'
                value={ searchValue }
                onChangeText={ ( text ) => setSearchValue( text )}
            />
            <>
            {
                searchValue.length === 0
                    ? (
                        <Icon 
                            name='search'
                            color={ softTextColor }
                            size={ 30 }
                        />
                    ):(
                        <Pressable
                            onPress={ () => setSearchValue('') }
                        >
                            <Icon 
                            name='close-circle'
                            color={ softTextColor }
                            size={ 25 }
                        />
                        </Pressable>
                    )
            }
            </>
        </InputContainer>
    )
}
