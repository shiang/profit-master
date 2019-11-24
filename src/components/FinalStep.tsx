import React, { useContext, useState } from 'react'
import { Text, SafeAreaView, View } from 'react-native'
import { CalculatorContext } from './CalculatorProvider'
import { TextInput, Button, Theme, withTheme } from 'react-native-paper'
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack'
import { globalStyles } from '../styles'
import { AdMobBanner } from 'expo-ads-admob'

interface Props {
  navigation: NavigationStackProp<{}>
  theme: Theme
}

interface NavOptions {
  navigationOptions: NavigationStackOptions
}

const FinalStep: React.FC<Props> & NavOptions = ({ navigation, theme }) => {
  const { dispatch } = useContext(CalculatorContext)

  const [ fobPrice, setFobPrice ] = useState<string>('')
  const [ forexRate, setForexRate ] = useState<string>('')
  const [ freight, setFreight ] = useState<string>('')

  const isDisabled = fobPrice.length === 0 || forexRate.length === 0 || freight.length === 0

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ padding: 25 }}>
        <Text style={globalStyles.pageHeaderText}>Please help us understand your pricing structure:</Text>
        <TextInput
          label='What is the FOB price?'
          keyboardType='numeric'
          placeholder='enter a price in your local currency'
          style={globalStyles.textInput}
          onChangeText={(text) => setFobPrice(text)}
          value={fobPrice}
        />
        <TextInput
          label='Local currency rate'
          keyboardType='numeric'
          placeholder='enter 1 if you are trading in USD'
          style={globalStyles.textInput}
          onChangeText={(text) => setForexRate(text)}
          value={forexRate}
        />
        <TextInput
          label='Freight cost percentage?'
          keyboardType='numeric'
          placeholder='Normally between 3 ~ 5%'
          style={globalStyles.textInput}
          onChangeText={(text) => setFreight(text)}
          value={freight}
        />
        <Button
        mode='contained'
        disabled={isDisabled}
        style={{ marginTop: 5, backgroundColor: isDisabled ? '#848E9B' : theme.colors.primary }}
        onPress={() => {
          dispatch({
            type: 'FINAL_STEP',
            payload: {
              fobPrice,
              forexRate,
              freight,
              landedCost: (Number(fobPrice) / Number(forexRate) * (1 + Number(freight) / 100)).toFixed(2)
            }
          })
          navigation.navigate('Result')
        }}>
          See Result
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

FinalStep.navigationOptions = {
  title: 'Final Step'
}

export default withTheme(FinalStep)
