import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import { AuthStatus } from '../context/auth/authReducer';
import { LoginScreen } from '../screens/LoginScreen';
import { BottomNavigator } from './BottomNavigator';

const Stack = createStackNavigator();

export const InitialNavigator = () => {

    const { state } = useContext( AuthContext )
    const { status } = state

    return (
        <Stack.Navigator>
            {
                status === AuthStatus.AUTHENTICATED
                    ? (
                        <Stack.Screen 
                            name="BottomNavigator" 
                            component={ BottomNavigator }
                            options={{
                                headerShown: false,
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
