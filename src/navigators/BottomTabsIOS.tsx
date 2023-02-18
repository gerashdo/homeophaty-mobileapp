import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MedicinesListScreen } from '../screens/MedicinesListScreen';

const Tab = createBottomTabNavigator();

export const BottomTabsIOS = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MedicinesListScreen" component={ MedicinesListScreen } />
    </Tab.Navigator>
  );
}