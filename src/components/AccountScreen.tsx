import React, { useContext } from 'react'
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack'
import { Theme } from 'react-native-paper/lib/typescript/src/types'
import { AuthContext } from './AuthProvider'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import AuthScreen from './AuthScreen'
import * as firebase from 'firebase'
import { NavigationActions } from 'react-navigation'

interface Props {
  navigation: NavigationStackProp<{}>
  theme: Theme
}

interface NavOptions {
  navigationOptions: NavigationStackOptions
}

const AccountScreen: React.FC<Props> & NavOptions = ({ navigation, theme }) => {
  const { isLoggedIn } = useContext(AuthContext)
  return isLoggedIn ? (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Button onPress={async () => {
       try {
        await firebase.auth().signOut()
        navigation.reset([NavigationActions.navigate({ routeName: 'Home' })], 0)
      } catch (err) {
        console.error(err.message)
      }
      }}>Sign out</Button>
    </View>
  ) : (
    <AuthScreen {...{navigation, theme }} />
  )
}

AccountScreen.navigationOptions = {
  title: 'Account'
}

export default AccountScreen
