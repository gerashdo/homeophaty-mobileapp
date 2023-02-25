import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { InitialNavigator } from './src/navigators/InitialNavigator';
import { ThemeProvider } from './src/context/theme/ThemeContext';
import { AuthProvider } from './src/context/auth/AuthContext';
import { MedicineProvider } from './src/context/medicine/MedicineContext';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const AppState = ({ children }: Props) => {
  return(
    <ThemeProvider>
      <AuthProvider>
        <MedicineProvider>
          { children }
        </MedicineProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

const App = () => {
  return (
    <AppState>
      <NavigationContainer>
        <InitialNavigator />
      </NavigationContainer>
    </AppState>
  )
}

export default App;
