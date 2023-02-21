import React, { useContext } from 'react'
import { ActivityIndicator } from 'react-native'
import { ThemeContext } from '../context/theme/ThemeContext'

export const CustomActivityIndicator = () => {
    const { theme: { secondary } } = useContext( ThemeContext )
    return (
        <ActivityIndicator 
            size={ 50 }
            color={ secondary }
        />
    )
}
