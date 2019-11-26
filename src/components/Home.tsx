import React, { useContext } from 'react'
import { Button } from 'react-native-paper'
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack'
import { Theme, withTheme } from 'react-native-paper';
import { AuthContext } from './AuthProvider';
import AuthScreen from './AuthScreen';
import Container from './Container';
import { CalculatorContext } from './CalculatorProvider';


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

const Home: React.FC<Props> & NavOptions = ({ navigation, theme }) => {

  const { isLoggedIn } = useContext(AuthContext)
  const { dispatch } = useContext(CalculatorContext)

  return isLoggedIn ? (
    <Container {...{theme}}>
       <Button
          mode='contained'
          style={{ marginTop: 25 }}
          onPress={() => navigation.navigate('StepOne')}
      >Calculate Gross Profit</Button>
      <Button
          mode='contained'
          style={{ marginTop: 25 }}
          onPress={() => {
            navigation.navigate('StepOne')
            dispatch({
              type: 'IS_CALC_FOB',
              payload: {
                isCalculateFob: true
              }
            })
          }}
      >Calculate FOB Price</Button>
    </Container>
  ) : (
    <AuthScreen {...{ navigation, theme }} />
  )
}

Home.navigationOptions = {
  title: 'Home'
}

export default withTheme(Home)
