import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { BottomNavigator } from './BottomNavigator';

const Stack = createStackNavigator();

export const InitialNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={ LoginScreen } />
      <Stack.Screen name="BottomNavigator" component={ BottomNavigator } />
    </Stack.Navigator>
  );
}
