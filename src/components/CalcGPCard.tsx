import React, { useContext } from 'react'
import {
  Card,
  Avatar,
  Paragraph,
  Button,
  Theme,
  withTheme
} from 'react-native-paper'
import {
  NavigationStackProp,
  NavigationStackOptions
} from 'react-navigation-stack'
import { CalculatorContext } from './CalculatorProvider'

interface NavigationParams {
  key: string
  routeName: string
}
interface Props {
  navigation: NavigationStackProp<NavigationParams>
  theme: Theme
}

interface NavOptions {
  navigationOptions: NavigationStackOptions
}

const CalcGPCard: React.FC<Props> & NavOptions = ({ navigation, theme }) => {
  const { dispatch } = useContext(CalculatorContext)

  return (
    <Card style={{ marginVertical: 20 }}>
      <Card.Title
        title='Calculate Gross Profit'
        left={props => <Avatar.Icon icon='chart-pie' />}
        titleStyle={{ marginLeft: 15, fontSize: 18 }}
        style={{ marginTop: 10 }}
      />
      <Card.Content>
        <Paragraph>
          Start here to calculate the gross profit of an existing product. It
          provides factors that are crucial to the gross profit of your product,
          allowing you to adjust any of these factors to help you stimulate your
          sales while staying in profit.
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() => {
            navigation.navigate('StepOne')
            dispatch({
              type: 'IS_CALC_FOB',
              payload: {
                isCalculateFob: false
              }
            })
          }}
        >
          Start here
        </Button>
      </Card.Actions>
    </Card>
  )
}

CalcGPCard.navigationOptions = {}

export default withTheme(CalcGPCard)
