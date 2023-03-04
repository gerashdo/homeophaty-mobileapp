import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { InitialNavigator } from './src/navigators/InitialNavigator';
import { ThemeProvider } from './src/context/theme/ThemeContext';
import { AuthProvider } from './src/context/auth/AuthContext';
import { MedicineProvider } from './src/context/medicine/MedicineContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface Props {
  children: JSX.Element | JSX.Element[];
}

const queryClient = new QueryClient()

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
    <QueryClientProvider client={ queryClient }>
      <AppState>
        <NavigationContainer>
          <InitialNavigator />
        </NavigationContainer>
      </AppState>
    </QueryClientProvider>
  )
}

export default App;
