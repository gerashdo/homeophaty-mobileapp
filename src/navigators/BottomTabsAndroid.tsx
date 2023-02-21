import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MedicinesListScreen } from '../screens/MedicinesListScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createMaterialBottomTabNavigator();

export const BottomTabsAndroid = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MedicinesListScreen" component={ MedicinesListScreen } />
      <Tab.Screen name="ProfileScreen" component={ ProfileScreen } />
    </Tab.Navigator>
  );
}