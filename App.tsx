/* eslint-disable react/display-name */
import { Ionicons } from '@expo/vector-icons'
import * as Font from 'expo-font'
import * as firebase from 'firebase'
import React, { useEffect } from 'react'
import { AppRegistry, Text } from 'react-native'
import {
  DefaultTheme,
  Provider as PaperProvider,
  Provider as PortalProvider
} from 'react-native-paper'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createClient, Provider as GQLProvider } from 'urql'
import getEnvVars from './environment'
import AuthProvider from './src/components/AuthProvider'
import CalculatorProvider from './src/components/CalculatorProvider'
import './src/fixtimerbug'
import { AccountStack, RootStack } from './src/routes'

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
        tabBarIcon: ({ focused }) => {
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
  useEffect(() => {
    Font.loadAsync({
      'avenir-next-bold': require('./assets/fonts/AvenirNextLTPro-Bold.otf'),
      'avenir-next-bold-cn': require('./assets/fonts/AvenirNextLTPro-BoldCn.otf'),
      'avenir-next-regular': require('./assets/fonts/AvenirNextLTPro-Regular.otf')
    })
  }, [])

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
