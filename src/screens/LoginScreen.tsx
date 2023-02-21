import React, { useContext } from 'react'
import { View } from 'react-native'
import { appStyles } from '../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LoginForm } from '../components/auth/LoginForm';
import { AuthContext } from '../context/auth/AuthContext';
import { AuthStatus } from '../context/auth/authReducer';
import { CustomActivityIndicator } from '../components/ActivityIndicator';


export const LoginScreen = () => {
    const { top } = useSafeAreaInsets()
    const { state: { status }} = useContext( AuthContext )

    return (
        <View style={{
            ...appStyles.globalMargin,
            flex: 1,
            marginTop: top,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {
                status === AuthStatus.CHECKING
                    ? ( <CustomActivityIndicator /> )
                    : ( <LoginForm /> )
            }
        </View>
    )
}
