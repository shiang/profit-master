import React, { useContext, useEffect } from 'react'
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack'
import { Theme } from 'react-native-paper/lib/typescript/src/types'
import { AuthContext } from './AuthProvider'
import { View, Text } from 'react-native'
import { Button, Avatar } from 'react-native-paper'
import AuthScreen from './AuthScreen'
import * as firebase from 'firebase'
import { NavigationActions } from 'react-navigation'
import _ from 'underscore'

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
    <View style={{ flex: 1, alignItems: 'center', padding: 40 }}>
      <Avatar.Image size={64} source={require('../../assets/avatar.png')} />
      <Text>{user.email}</Text>
      <Button onPress={() => {
        navigation.navigate({ routeName: 'SavedCalc' })
      }}>View Data</Button>
      <Button onPress={async () => {
       try {
        await firebase.auth().signOut()
        navigation.reset([NavigationActions.navigate({ routeName: 'Account' })], 0)
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
