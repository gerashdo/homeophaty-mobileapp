import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MedicinesListScreen } from '../screens/MedicinesListScreen';

const Tab = createMaterialBottomTabNavigator();

export const BottomTabsAndroid = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MedicinesListScreen" component={ MedicinesListScreen } />
    </Tab.Navigator>
  );
}