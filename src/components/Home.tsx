import React from 'react'
import { View, Button } from 'react-native'
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack'
import {
  AdMobBanner,
} from 'expo-ads-admob';
import { Theme, withTheme } from 'react-native-paper';

interface Props {
  navigation: NavigationStackProp<{}>
  theme: Theme
}

interface NavOptions {
  navigationOptions: NavigationStackOptions
}

const Home: React.FC<Props> & NavOptions = ({ navigation, theme }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: theme.colors.background }}>
      <Button
          title="Go to Calculator"
          onPress={() => navigation.navigate('StepOne')}
        />
     <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
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

Home.navigationOptions = {
  title: 'Home'
}

export default withTheme(Home)
