import React, { useContext } from 'react'
import {
  Avatar,
  Button,
  Card,
  Paragraph,
  Theme,
  withTheme
} from 'react-native-paper'
import {
  NavigationStackOptions,
  NavigationStackProp
} from 'react-navigation-stack'
import { globalStyles } from '../styles'
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
        titleStyle={globalStyles.homeCardTitle}
        style={{ marginTop: 10 }}
      />
      <Card.Content>
        <Paragraph style={{ fontFamily: 'avenir-next-regular' }}>
          Need to adjust pricing strategy for your existing product but are not
          sure if you will stay in profit?
        </Paragraph>
      </Card.Content>
      <Card.Actions style={{ justifyContent: 'flex-end' }}>
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
