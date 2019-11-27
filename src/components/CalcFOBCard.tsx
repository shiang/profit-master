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

const CalcFOBCard: React.FC<Props> & NavOptions = ({ navigation, theme }) => {
  const { dispatch } = useContext(CalculatorContext)

  return (
    <Card>
      <Card.Title
        title='Calculate FOB Price'
        left={props => <Avatar.Icon icon='chart-line-stacked' />}
        titleStyle={{ marginLeft: 15, fontSize: 18 }}
        style={{ marginTop: 10 }}
      />
      <Card.Content>
        <Paragraph>
          Start here if you are starting a new product but would like to find
          out the maximum cost (FOB price) it needs to be in order for it to be
          profitable in your existing sales channel.
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() => {
            navigation.navigate('StepOne')
            dispatch({
              type: 'IS_CALC_FOB',
              payload: {
                isCalculateFob: true
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

CalcFOBCard.navigationOptions = {}

export default withTheme(CalcFOBCard)
