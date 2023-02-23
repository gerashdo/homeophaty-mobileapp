import React, { useContext } from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import { NewMedicineScreen } from '../screens/NewMedicineScreen';
import { MedicinesListScreen } from '../screens/MedicinesListScreen';
import { ThemeContext } from '../context/theme/ThemeContext';
import { MedicineScreen } from '../screens/MedicineScreen';
import { MedicineInnerMedsScreen } from '../screens/MedicineInnerMedsScreen';

export enum MedicinesRoutes {
    MEDICINES_LIST = "MedicinesListScreen",
    NEW_MEDICINE = "NewMedicineScreen",
    MEDICINE_DETAILS = "MedicineScreen",
    INNER_MEDS = "MedicineInnerMedsScreen",
}

export type MedicinesRootStackParamList = {
    MedicinesListScreen: undefined,
    NewMedicineScreen: undefined,
    MedicineScreen: undefined,
    MedicineInnerMedsScreen: undefined,
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
                name={ MedicinesRoutes.MEDICINES_LIST } 
                component={ MedicinesListScreen }
            />
            <Stack.Screen name={ MedicinesRoutes.NEW_MEDICINE } component={ NewMedicineScreen }/>
            <Stack.Screen name={ MedicinesRoutes.MEDICINE_DETAILS } component={ MedicineScreen }/>
            <Stack.Screen name={ MedicinesRoutes.INNER_MEDS } component={ MedicineInnerMedsScreen }/>
        </Stack.Navigator>
    )
}



