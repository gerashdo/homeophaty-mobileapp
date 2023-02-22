import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigator } from './BottomNavigator';
import { NewMedicineScreen } from '../screens/NewMedicineScreen';
import { MedicinesListScreen } from '../screens/MedicinesListScreen';
import { ThemeContext } from '../context/theme/ThemeContext';
import { SimpleButtonWithLogo } from '../components/SimpleButtonWithLogo';

export type MedicinesRootStackParamList = {
    MedicinesListScreen: undefined,
    NewMedicineScreen: undefined,
}

const Stack = createStackNavigator<MedicinesRootStackParamList>();

export const MedicinesStackNavigator = () => {
    const { theme: { colors } } = useContext( ThemeContext )

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle:{
                    backgroundColor: colors.background,
                    elevation: 0,
                    borderBottomWidth: 0,
                    shadowOpacity: 0,
                },
                cardStyle:{
                    backgroundColor: colors.background,
                }
            }}
        >
            <Stack.Screen 
                name='MedicinesListScreen' 
                component={ MedicinesListScreen }
            />
            <Stack.Screen name='NewMedicineScreen' component={ NewMedicineScreen }/>
        </Stack.Navigator>
    )
}
