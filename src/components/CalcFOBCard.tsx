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

const CalcFOBCard: React.FC<Props> & NavOptions = ({ navigation, theme }) => {
  const { dispatch } = useContext(CalculatorContext)

  return (
    <Card>
      <Card.Title
        title='Calculate FOB Price'
        left={props => <Avatar.Icon icon='chart-line-stacked' />}
        titleStyle={globalStyles.homeCardTitle}
        style={{ marginTop: 10 }}
      />
      <Card.Content>
        <Paragraph style={{ fontFamily: 'avenir-next-regular' }}>
          Making a new product but are not sure how its cost (FOB price) should
          be in order to stay profit in your existing sales channel?
        </Paragraph>
      </Card.Content>
      <Card.Actions style={{ justifyContent: 'flex-end' }}>
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
