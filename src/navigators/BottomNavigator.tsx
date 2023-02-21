import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import { Platform } from 'react-native';
import { TabBarIcon } from '../components/TabBarIcon';
import { ThemeContext } from '../context/theme/ThemeContext';
import { MedicinesListScreen } from '../screens/MedicinesListScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export const BottomNavigator = () => {
  const { theme: { colors } } = useContext( ThemeContext )

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: colors.background
      }}
      screenOptions={{
        headerStyle:{
          backgroundColor: colors.background,
          elevation: 0,
          borderBottomWidth: 0,
          shadowOpacity: 0,
        },
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
        name="MedicinesListScreen" 
        component={ MedicinesListScreen }
        options={{
          tabBarLabel: "Medicamentos",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon color={ color } focused={ focused } name="medkit"/>
          )
        }}
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
