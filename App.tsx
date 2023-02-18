import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { InitialNavigator } from './src/navigators/InitialNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <InitialNavigator />
    </NavigationContainer>
  )
}

export default App;
