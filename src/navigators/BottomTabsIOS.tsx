import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MedicinesListScreen } from '../screens/MedicinesListScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export const BottomTabsIOS = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MedicinesListScreen" component={ MedicinesListScreen } />
      <Tab.Screen name="ProfileScreen" component={ ProfileScreen } />
    </Tab.Navigator>
  );
}