import React, { useContext } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from '../components/Toast';
import { AuthContext } from '../context/auth/AuthContext';
import { HighOrderComponent } from '../interfaces/common';


export const ScreenTemplate = ({ children }: HighOrderComponent) => {
    const { top } = useSafeAreaInsets()
    const { state } = useContext( AuthContext )
    const { errorMessage: authError } = state

    return (
        <View style={{
            flex: 1,
            marginTop: top
        }}>
            { children }
            {
                authError && (
                    <Toast message={ authError }/>
                )
            }
        </View>
    )
}
