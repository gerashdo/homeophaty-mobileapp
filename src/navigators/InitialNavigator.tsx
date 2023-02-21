import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { AuthStatus } from '../context/auth/authReducer';
import { ThemeContext } from '../context/theme/ThemeContext';
import { LoginScreen } from '../screens/LoginScreen';
import { BottomNavigator } from './BottomNavigator';

const Stack = createStackNavigator();

export const InitialNavigator = () => {

    const { state } = useContext( AuthContext )
    const { theme: { colors } } = useContext( ThemeContext )
    const { status } = state

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle:{
                    backgroundColor: colors.background
                }
            }}
        >
            {
                status === AuthStatus.AUTHENTICATED
                    ? (
                        <Stack.Screen 
                            name="BottomNavigator" 
                            component={ BottomNavigator }
                            options={{
                                headerShown: false
                            }}
                        />
                    )
                    :(
                        <Stack.Screen 
                            name="LoginScreen" 
                            component={ LoginScreen }
                            options={{
                                headerShown: false,
                            }}
                        />
                    )
            }
        </Stack.Navigator>
    );
}
