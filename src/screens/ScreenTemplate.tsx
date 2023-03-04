import React, { useContext } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from '../components/Toast';
import { AuthContext } from '../context/auth/AuthContext';
import { HighOrderComponent } from '../interfaces/common';
import { useBoundStore } from '../store/useBoundStore';

interface Props extends HighOrderComponent {
    safeArea?: boolean,
    style?: StyleProp<ViewStyle>
}

export const ScreenTemplate = ({ children, safeArea = false, style = {} }: Props) => {
    const { top } = useSafeAreaInsets()
    const { state } = useContext( AuthContext )
    const { errorMessage: medsError } = useBoundStore()

    const { errorMessage: authError } = state

    return (
        <View style={[{
            flex: 1,
            marginTop: ( safeArea ) ? top : 0,
        }, style ]}>
            { children }
            {
                authError && (
                    <Toast message={ authError }/>
                )
            }
            {
                medsError && (
                    <Toast message={ medsError }/>
                )
            }
        </View>
    )
}
