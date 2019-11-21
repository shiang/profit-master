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

const StepOne: React.FC<Props> & NavOptions = ({ navigation }) => {
  const { state, dispatch } = useContext(CalculatorContext)

  const [ rrp, setRrp ] = useState<string>('')
  const [ gst, setGst ] = useState<string>('')
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 25 }}>
        <Text>Please answer the following questions:</Text>
        <TextInput
          label='What is the desired retail price'
          keyboardType='numeric'
          placeholder='enter a price in your local currency'
          onChangeText={(text) => setRrp(text)}
          value={rrp}
        />
        <TextInput
          label='What is the local sales tax'
          keyboardType='numeric'
          placeholder='enter a value in percentage'
          onChangeText={(text) => setGst(text)}
          value={gst}
        />
        <Button onPress={() => {
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
    </SafeAreaView>
  )
}

StepOne.navigationOptions = {
  title: 'Step 1'
}

export default StepOne
