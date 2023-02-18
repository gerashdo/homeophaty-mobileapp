import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { BottomTabsAndroid } from './BottomTabsAndroid';
import { BottomTabsIOS } from './BottomTabsIOS';

const Tab = createBottomTabNavigator();

export const BottomNavigator = () => {
  return (
    Platform.OS === 'ios'
        ? <BottomTabsIOS />
        : <BottomTabsAndroid />
  );
}
