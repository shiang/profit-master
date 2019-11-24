import React, { useContext, useState } from 'react'
import { Text, SafeAreaView, View } from 'react-native'
import { CalculatorContext } from './CalculatorProvider'
import { TextInput, Button, withTheme } from 'react-native-paper'
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack'
import { globalStyles } from '../styles'
import { Theme } from 'react-native-paper/lib/typescript/src/types'
import { AdMobBanner } from 'expo-ads-admob'
import Container from './Container'

interface Props {
  navigation: NavigationStackProp<{}>
  theme: Theme
}

interface NavOptions {
  navigationOptions: NavigationStackOptions
}

const StepTwo: React.FC<Props> & NavOptions = ({ navigation, theme }) => {
  const { dispatch } = useContext(CalculatorContext)

  const [ margin, setMargin ] = useState<string>('')
  const [ disty, setDisty ] = useState<string>('')
  const [ rebate, setRebate ] = useState<string>('')

  const isDisabled = margin.length === 0 || disty.length === 0 || rebate.length === 0

  return (
    <Container {...{theme}}>
      <Text style={globalStyles.pageHeaderText}>Please help us understand your distribution strategy:</Text>
      <TextInput
        label='Retailer Profit Margin'
        keyboardType='numeric'
        placeholder='enter a value in percentage'
        style={globalStyles.textInput}
        onChangeText={(text) => setMargin(text)}
        value={margin}
      />
      <TextInput
        label='Distributor Profit Margin'
        keyboardType='numeric'
        placeholder='enter a value in percentage'
        style={globalStyles.textInput}
        onChangeText={(text) => setDisty(text)}
        value={disty}
      />
      <TextInput
        label='Rebate percentage'
        keyboardType='numeric'
        placeholder='enter a value in percentage'
        style={globalStyles.textInput}
        onChangeText={(text) => setRebate(text)}
        value={rebate}
      />
      <Button
      mode='contained'
      disabled={isDisabled}
      style={{ marginTop: 5, backgroundColor: isDisabled ? '#848E9B' : theme.colors.primary }}
      onPress={() => {
        dispatch({
          type: 'STEP_2',
          payload: {
            margin,
            disty,
            rebate
          }
        })
        navigation.navigate('FinalStep')
      }}>
        Next
      </Button>
    </Container>
  )
}

StepTwo.navigationOptions = {
  title: 'Step 2'
}

export default withTheme(StepTwo)
