import React, { useContext, useState } from 'react'
import { Text, SafeAreaView, View } from 'react-native'
import { CalculatorContext } from './CalculatorProvider'
import { TextInput, Button } from 'react-native-paper'
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack'

interface Props {
  navigation: NavigationStackProp<{}>
}

interface NavOptions {
  navigationOptions: NavigationStackOptions
}

const FinalStep: React.FC<Props> & NavOptions = ({ navigation }) => {
  const { dispatch } = useContext(CalculatorContext)

  const [ fobPrice, setFobPrice ] = useState<string>('')
  const [ forexRate, setForexRate ] = useState<string>('')
  const [ freight, setFreight ] = useState<string>('')

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 25 }}>
        <Text>Please help us understand your pricing structure:</Text>
        <TextInput
          label='What is the FOB price?'
          keyboardType='numeric'
          placeholder='enter a price in your local currency'
          onChangeText={(text) => setFobPrice(text)}
          value={fobPrice}
        />
        <TextInput
          label='What is the currency rate against the USD?'
          keyboardType='numeric'
          placeholder='enter 1 if you are trading in USD'
          onChangeText={(text) => setForexRate(text)}
          value={forexRate}
        />
        <TextInput
          label='What is the freight cost in percentage?'
          keyboardType='numeric'
          placeholder='Normally between 3 ~ 5%'
          onChangeText={(text) => setFreight(text)}
          value={freight}
        />
        <Button onPress={() => {
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
    </SafeAreaView>
  )
}

FinalStep.navigationOptions = {
  title: 'Final Step'
}

export default FinalStep
