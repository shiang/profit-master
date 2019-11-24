import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack'
import {
  AdMobBanner,
} from 'expo-ads-admob';
import { Theme, withTheme, TextInput } from 'react-native-paper';
import { AuthContext } from './AuthProvider';
import AuthScreen from './AuthScreen';
import * as firebase from 'firebase'
import { NavigationActions } from 'react-navigation';

interface Props {
  navigation: NavigationStackProp<{}>
  theme: Theme
}

interface NavOptions {
  navigationOptions: NavigationStackOptions
}

const Home: React.FC<Props> & NavOptions = ({ navigation, theme }) => {

  const { isLoggedIn } = useContext(AuthContext)

  return isLoggedIn ? (
    <View>
       <Button
          mode='contained'
          style={{ marginTop: 5 }}
          onPress={() => navigation.navigate('StepOne')}
      >Let's start!</Button>
    </View>
  ) : (
    <AuthScreen {...{ navigation, theme }} />
  )
}

Home.navigationOptions = {
  title: 'Home'
}

export default withTheme(Home)
