import React from 'react'
import { View } from 'react-native'
import { appStyles } from '../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LoginForm } from '../components/auth/LoginForm';


export const LoginScreen = () => {
    const { top } = useSafeAreaInsets()

    return (
        <View style={{
            ...appStyles.globalMargin,
            flex: 1,
            marginTop: top,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <LoginForm />
        </View>
    )
}
