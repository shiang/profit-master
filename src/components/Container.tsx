import React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
  ScrollView,
  StyleProp,
  ViewStyle
} from 'react-native'
import { Theme } from 'react-native-paper/lib/typescript/src/types'
import { AdMobBanner } from 'expo-ads-admob'

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
        <ScrollView
          style={{ padding: 25, marginBottom: 10 }}
          keyboardShouldPersistTaps='never'
        >
          {children}
        </ScrollView>
        <View
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
        >
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
