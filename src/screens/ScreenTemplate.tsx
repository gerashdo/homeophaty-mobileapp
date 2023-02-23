import React, { useContext } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from '../components/Toast';
import { AuthContext } from '../context/auth/AuthContext';
import { MedicineContext } from '../context/medicine/MedicineContext';
import { HighOrderComponent } from '../interfaces/common';

interface Props extends HighOrderComponent {
    safeArea?: boolean,
    style?: StyleProp<ViewStyle>
}

export const ScreenTemplate = ({ children, safeArea = false, style = {} }: Props) => {
    const { top } = useSafeAreaInsets()
    const { state } = useContext( AuthContext )
    const { medicineState } = useContext( MedicineContext )

    const { errorMessage: authError } = state
    const { errorMessage: medsError } = medicineState

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
