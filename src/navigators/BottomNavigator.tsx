import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from '../screens/LoginScreen';
import { MedicinesListScreen } from '../screens/MedicinesListScreen';

const Tab = createBottomTabNavigator();

export const BottomNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={ LoginScreen } />
      <Tab.Screen name="MedicinesListScreen" component={ MedicinesListScreen } />
    </Tab.Navigator>
  );
}
