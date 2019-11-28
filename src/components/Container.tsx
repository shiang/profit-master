import { AdMobBanner } from 'expo-ads-admob'
import React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleProp,
  View,
  ViewStyle
} from 'react-native'
import { Theme } from 'react-native-paper/lib/typescript/src/types'

interface Props {
  children?: React.ReactNode
  theme: Theme
  rootStyles?: StyleProp<ViewStyle>
}

const Container: React.FC<Props> = ({ children, theme }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
      >
        <StatusBar backgroundColor='blue' barStyle='light-content' />
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 25,
            paddingVertical: 10,
            flex: 1
          }}
          keyboardShouldPersistTaps='handled'
        >
          {children}
        </ScrollView>
        <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
          <AdMobBanner
            bannerSize='banner'
            adUnitID='ca-app-pub-3940256099942544/6300978111' // Test ID, Replace with your-admob-unit-id
            testDeviceID='EMULATOR'
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={() => console.log('load ad fail')}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default Container
