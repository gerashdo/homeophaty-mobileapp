import { useContext } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, ParamListBase, RouteProp } from '@react-navigation/native';

import { TabBarIcon } from '../components/TabBarIcon';
import { ThemeContext } from '../context/theme/ThemeContext';
import { ProfileScreen } from '../screens/ProfileScreen';
import { MedicinesRoutes, MedicinesStackNavigator } from './MedicinesStackNavigator';

const Tab = createBottomTabNavigator();

export const BottomNavigator = () => {
  const { theme: { colors, buttonTextColor } } = useContext( ThemeContext )

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: colors.background
      }}
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 0,
          height: (Platform.OS === 'android') ? 70 : 80,
          paddingBottom: (Platform.OS === 'android') ? 10 : 20,
          paddingTop: 10,
        },
        tabBarLabelStyle:{
          fontWeight: '500',
        },
        tabBarInactiveTintColor: colors.text,
      }}
    >
      <Tab.Screen 
        name="MedicinesStackNavigator" 
        component={ MedicinesStackNavigator }
        options={ ({ route }) => ({
          headerShown: false,
          tabBarLabel: "Medicamentos",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={ color } focused={ focused } name="medkit"/>
          ),
          tabBarStyle: { display: getVisibilityOptionTab( route ) as any }
        })}
      />
      <Tab.Screen 
        name="ProfileScreen" 
        component={ ProfileScreen }
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={ color } focused={ focused } name="person-circle"/>
          )
        }}
      />
    </Tab.Navigator>
  );
}

const getVisibilityOptionTab = ( route: RouteProp<ParamListBase, string>): string => {
  const routeName = getFocusedRouteNameFromRoute( route ) ?? MedicinesRoutes.MEDICINES_LIST

  if( routeName !== MedicinesRoutes.MEDICINES_LIST ) return 'none'

  return 'flex'
}
