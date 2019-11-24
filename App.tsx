import React from 'react';
import { StyleSheet, ScrollView, View, AppRegistry } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { createAppContainer } from 'react-navigation';
import { RootStack } from './src/routes';
import CalculatorProvider from './src/components/CalculatorProvider';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    roundness: 2,
    primary: '#30CC9A',
    text: '#30CC9A',
    accent: '#F1563B',
    placeholder: '#fff',
    background: '#000'
  }
}

const AppContainer = createAppContainer(RootStack)

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <CalculatorProvider>
        <AppContainer />
      </CalculatorProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent('App', () => App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
