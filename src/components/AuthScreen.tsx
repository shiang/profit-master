import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button, HelperText } from 'react-native-paper'
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack'
import {
  AdMobBanner,
} from 'expo-ads-admob';
import { Theme, withTheme, TextInput } from 'react-native-paper';
import { globalStyles } from '../styles';
import * as firebase from 'firebase'

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

const AuthScreen: React.FC<Props> & NavOptions = ({ navigation, theme }) => {

  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const [ isRegistered, setIsRegistered ] = useState<boolean>(false)
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null)

  const isDisabled = email.length === 0 || password.length === 0

  const login = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  const signUp = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ padding: 25 }}>
      <TextInput
          label='Email'
          keyboardType='email-address'
          style={globalStyles.textInput}
          onChangeText={(text) => setEmail(text)}
          value={email}
      />
      <TextInput
        label='Password'
        textContentType='password'
        secureTextEntry={true}
        style={globalStyles.textInput}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button
        mode='contained'
        style={{ marginTop: 5, marginBottom: 10, backgroundColor: isDisabled ? '#848E9B' : theme.colors.primary  }}
        disabled={isDisabled}
        onPress={isRegistered ? login : signUp}
      >{ isRegistered ? 'Log in': 'Register' }</Button>
      {errorMessage && (
        <View style={{ alignItems: 'center' }}>
          <HelperText
            type='error'
            visible={errorMessage}
          >
            {errorMessage}
          </HelperText>
        </View>
      )}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'white' }}>{isRegistered ? 'No account yet?' : 'Already registered?'}</Text>
        <Button
          onPress={() => {setIsRegistered(!isRegistered)}}>{isRegistered ? 'Register' : 'Log in'}
        </Button>
      </View>
      {navigation.state.routeName === 'Home' && <Button
          mode='contained'
          style={{ marginTop: 5 }}
          onPress={() => navigation.navigate('StepOne')}
      >Use without an account</Button>}
      </View>
     <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 30 }}>
      <AdMobBanner
        bannerSize="banner"
        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
        testDeviceID="EMULATOR"
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={() => console.log('load ad fail')}
       />
      </View>
    </View>
  )
}

AuthScreen.navigationOptions = {
  title: 'Home'
}

export default withTheme(AuthScreen)
