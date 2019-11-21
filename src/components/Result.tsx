import React, { useContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { CalculatorContext } from './CalculatorProvider'
import { Button } from 'react-native-paper'

interface Props {
  navigation: NavigationStackProp<{}>
}

interface NavOptions {
  navigationOptions: NavigationStackOptions
}


const Result: React.FC<Props> & NavOptions = ({ navigation }) => {
  const { state, dispatch } = useContext(CalculatorContext)

  const [ gpInDollar, setGpInDollar ] = useState<string | null>(null)
  const [ gpInPercentage, setGpInPercentage ] = useState<string | null>(null)

  useEffect(() => {
    const { gst, margin, disty, rebate, rrp, landedCost } = state
    const gpInDollar = ((Number(rrp) / (1 + Number(gst) / 100)) * (1 - (Number(margin) / 100)) * (1 - (Number(disty) / 100))) - ((Number(rrp) / (1 + (Number(gst) / 100))) * (1 - (Number(margin) / 100)) * (Number(rebate) / 100)) - Number(landedCost)
    const gpInPercentage = (((Number(rrp) / (1 + Number(gst) / 100)) * (1 - (Number(margin) / 100)) * (1 - (Number(disty) / 100))) - (((Number(rrp) / (1 + (Number(gst) / 100))) * (1 - (Number(margin) / 100)) * (Number(rebate) / 100)) + Number(landedCost))) / ((Number(rrp) / (1 + Number(gst) / 100)) * (1 - (Number(margin) / 100)) * (1 - (Number(disty) / 100)))
    setGpInDollar(gpInDollar.toFixed(2))
    setGpInPercentage(`${(gpInPercentage * 100).toFixed(2)}%`)
  })
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {gpInDollar && <Text>You are making ${gpInDollar}</Text>}
      {gpInPercentage && <Text>The gross profit percentage is {gpInPercentage}</Text>}
      <Button onPress={async () => {
        await dispatch({
          type: 'RESET'
        })
        navigation.push('StepOne')
      }}>
        Start Over
      </Button>
    </View>
  )
}

Result.navigationOptions = {
  title: 'Result'
}

export default Result
