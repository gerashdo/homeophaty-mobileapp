import React, { useContext } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from '../components/Toast';
import { AuthContext } from '../context/auth/AuthContext';
import { HighOrderComponent } from '../interfaces/common';

interface Props extends HighOrderComponent {
    safeArea?: boolean,
}

export const ScreenTemplate = ({ children, safeArea = false }: Props) => {
    const { top } = useSafeAreaInsets()
    const { state } = useContext( AuthContext )
    const { errorMessage: authError } = state

    return (
        
        <View style={{
            flex: 1,
            marginTop: ( safeArea ) ? top : 0, 
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
