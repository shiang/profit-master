import * as firebase from 'firebase'
import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { Avatar, Button, withTheme } from 'react-native-paper'
import { Theme } from 'react-native-paper/lib/typescript/src/types'
import { NavigationActions } from 'react-navigation'
import {
  NavigationStackOptions,
  NavigationStackProp
} from 'react-navigation-stack'
import { globalStyles } from '../styles'
import { AuthContext } from './AuthProvider'
import AuthScreen from './AuthScreen'
import Container from './Container'

interface NavigationParams {
  key: string
  routeName: string
}
interface Props {
  navigation: NavigationStackProp<NavigationParams>
  theme: Theme
}

interface NavOptions {
  navigationOptions: NavigationStackOptions
}

const AccountScreen: React.FC<Props> & NavOptions = ({ navigation, theme }) => {
  const { isLoggedIn, user } = useContext(AuthContext)

  return isLoggedIn && user ? (
    <Container {...{ theme }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Avatar.Image size={64} source={require('../../assets/avatar.png')} />
        <Text
          style={{
            ...globalStyles.textBaseStyle,
            marginVertical: 8
          }}
        >
          {user.email}
        </Text>
        <Button
          style={{ marginVertical: 8 }}
          onPress={() => {
            navigation.navigate({ routeName: 'SavedCalc' })
          }}
        >
          View Saved Calculations
        </Button>
        <Button
          onPress={async () => {
            try {
              await firebase.auth().signOut()
              navigation.reset(
                [NavigationActions.navigate({ routeName: 'Account' })],
                0
              )
            } catch (err) {
              console.error(err.message)
            }
          }}
        >
          Sign out
        </Button>
      </View>
    </Container>
  ) : (
    <AuthScreen {...{ navigation, theme }} />
  )
}

AccountScreen.navigationOptions = {
  title: 'Account'
}

export default withTheme(AccountScreen)
