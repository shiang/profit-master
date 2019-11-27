import React, { useContext } from 'react'
import { Button, ActivityIndicator } from 'react-native-paper'
import {
  NavigationStackProp,
  NavigationStackOptions
} from 'react-navigation-stack'
import { Theme, withTheme } from 'react-native-paper'
import { AuthContext } from './AuthProvider'
import AuthScreen from './AuthScreen'
import Container from './Container'
import { CalculatorContext } from './CalculatorProvider'
import CalcGPCard from './CalcGPCard'
import CalcFOBCard from './CalcFOBCard'
import { View } from 'react-native'

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
  const { isLoggedIn, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return (
      <Container {...{ theme }}>
        <ActivityIndicator animating color={theme.colors.primary} />
      </Container>
    )
  }

  return isLoggedIn && !isLoading ? (
    <Container {...{ theme }}>
      <View style={{ flex: 1 }}>
        <CalcGPCard {...{ navigation, theme }} />
        <CalcFOBCard {...{ navigation, theme }} />
      </View>
    </Container>
  ) : (
    <AuthScreen {...{ navigation, theme }} />
  )
}

Home.navigationOptions = {
  title: 'Home'
}

export default withTheme(Home)
