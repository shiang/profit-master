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

const StepTwo: React.FC<Props> & NavOptions = ({ navigation }) => {
  const { dispatch } = useContext(CalculatorContext)

  const [ margin, setMargin ] = useState<string>('')
  const [ disty, setDisty ] = useState<string>('')
  const [ rebate, setRebate ] = useState<string>('')

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 25 }}>
        <Text>Please help us understand your distribution channels:</Text>
        <TextInput
          label='Profit margin your retailer is asking for?'
          keyboardType='numeric'
          placeholder='enter a value in percentage'
          onChangeText={(text) => setMargin(text)}
          value={margin}
        />
        <TextInput
          label='Profit margin your distributor is asking for?'
          keyboardType='numeric'
          placeholder='enter a value in percentage'
          onChangeText={(text) => setDisty(text)}
          value={disty}
        />
        <TextInput
          label='Rebate percentage you are giving out?'
          keyboardType='numeric'
          placeholder='enter a value in percentage'
          onChangeText={(text) => setRebate(text)}
          value={rebate}
        />
        <Button onPress={() => {
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
      </View>
    </SafeAreaView>
  )
}

StepTwo.navigationOptions = {
  title: 'Step 2'
}

export default StepTwo
