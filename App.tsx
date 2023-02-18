import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { InitialNavigator } from './src/navigators/InitialNavigator';
import { ThemeProvider } from './src/context/theme/ThemeContext';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const AppState = ({ children }: Props) => {
  return(
    <ThemeProvider>
      { children }
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
