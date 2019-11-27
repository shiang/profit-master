import './src/fixtimerbug'

import React from 'react'
import { StyleSheet, Text, AppRegistry, View } from 'react-native'
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
import { createAppContainer } from 'react-navigation'
import { RootStack, AccountStack } from './src/routes'
import CalculatorProvider from './src/components/CalculatorProvider'
import * as firebase from 'firebase'
import getEnvVars from './environment'
import AuthProvider from './src/components/AuthProvider'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'
import { Provider as GQLProvider, createClient } from 'urql'
import { Provider as PortalProvider } from 'react-native-paper'

const client = createClient({
  url: 'https://countries.trevorblades.com/'
})

const {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
} = getEnvVars()
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// export const usersDbRef = firebase.database().ref('users')
// export const userRef = (uid: string) => usersDbRef.child(uid)

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

const AppContainer = createAppContainer(
  createBottomTabNavigator(
    {
      Home: RootStack,
      Account: AccountStack
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state
          let iconName
          if (routeName === 'Home') {
            iconName = 'md-calculator'
          } else if (routeName === 'Account') {
            iconName = 'md-person'
          }
          return (
            <Ionicons
              name={iconName}
              size={32}
              color={focused ? '#30CC9A' : '#747477'}
            />
          )
        },
        tabBarLabel: ({ focused }) => {
          const { routeName } = navigation.state
          let label
          if (routeName === 'Home') {
            return (label = focused ? (
              <Text style={{ color: '#30CC9A', fontSize: 12 }}>Home</Text>
            ) : null)
          }

          if (routeName === 'Account') {
            return (label = focused ? (
              <Text style={{ color: '#30CC9A', fontSize: 12 }}>Account</Text>
            ) : null)
          }

          return label
        }
      }),
      tabBarOptions: {
        showLabel: false,
        style: {
          backgroundColor: '#000'
        }
      }
    }
  )
)

export default function App() {
  return (
    <PortalProvider>
      <GQLProvider value={client}>
        <PaperProvider theme={theme}>
          <AuthProvider>
            <CalculatorProvider>
              <AppContainer />
            </CalculatorProvider>
          </AuthProvider>
        </PaperProvider>
      </GQLProvider>
    </PortalProvider>
  )
}

AppRegistry.registerComponent('App', () => App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
