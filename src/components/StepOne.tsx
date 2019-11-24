import React, { useContext, useState } from 'react'
import { SafeAreaView, View, StyleSheet, TextInput as TI } from 'react-native'
import { CalculatorContext } from './CalculatorProvider'
import { TextInput, Button, Text, withTheme } from 'react-native-paper'
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack'
import { Theme } from 'react-native-paper/lib/typescript/src/types'
import { globalStyles } from '../styles'
import { AdMobBanner } from 'expo-ads-admob'

interface Props {
  navigation: NavigationStackProp<{}>
  theme: Theme
}

interface NavOptions {
  navigationOptions: NavigationStackOptions
}

const StepOne: React.FC<Props> & NavOptions = ({ navigation, theme }) => {
  const { dispatch } = useContext(CalculatorContext)
  console.log({ theme })
  const [ rrp, setRrp ] = useState<string>('')
  const [ gst, setGst ] = useState<string>('')
  const isDisabled = rrp.length === 0 || gst.length === 0
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background  }}>
      <View style={{ padding: 25 }}>
        <Text style={globalStyles.pageHeaderText}>
          Please let us know
        </Text>
        <TextInput
          label='What is the desired retail price'
          keyboardType='numeric'
          style={globalStyles.textInput}
          placeholder='enter a price in your local currency'
          onChangeText={(text) => setRrp(text)}
          value={rrp}
        />
        <TextInput
          label='What is the local sales tax?'
          keyboardType='numeric'
          style={globalStyles.textInput}
          placeholder='enter a value in percentage'
          onChangeText={(text) => setGst(text)}
          value={gst}
        />
        <Button
        mode='contained'
        disabled={isDisabled}
        style={{ marginTop: 5, backgroundColor: isDisabled ? '#848E9B' : theme.colors.primary }}
        onPress={() => {
          dispatch({
            type: 'STEP_1',
            payload: {
              rrp,
              gst
            }
          })
          navigation.navigate('StepTwo')
        }}>
          Next
        </Button>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        <AdMobBanner
          bannerSize="banner"
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
          testDeviceID="EMULATOR"
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={() => console.log('load ad fail')}
        />
      </View>
    </SafeAreaView>
  )
}

StepOne.navigationOptions = {
  title: 'Step 1'
}

export default withTheme(StepOne)
