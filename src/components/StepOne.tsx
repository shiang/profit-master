import React, { useContext, useState } from 'react'
import { CalculatorContext } from './CalculatorProvider'
import { TextInput, Button, Text, withTheme } from 'react-native-paper'
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack'
import { Theme } from 'react-native-paper/lib/typescript/src/types'
import { globalStyles } from '../styles'
import Container from './Container'

interface Props {
  navigation: NavigationStackProp<{}>
  theme: Theme
}

interface NavOptions {
  navigationOptions: NavigationStackOptions
}

const StepOne: React.FC<Props> & NavOptions = ({ navigation, theme }) => {
  const { dispatch } = useContext(CalculatorContext)

  const [ rrp, setRrp ] = useState<string>('')
  const [ gst, setGst ] = useState<string>('')
  const isDisabled = rrp.length === 0 || gst.length === 0
  return (
    <Container {...{theme}}>
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
      </Container>
  )
}

StepOne.navigationOptions = {
  title: 'Step 1'
}

export default withTheme(StepOne)
