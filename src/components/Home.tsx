import React, { useContext } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Theme, withTheme } from 'react-native-paper'
import {
  NavigationStackOptions,
  NavigationStackProp
} from 'react-navigation-stack'
import { AuthContext } from './AuthProvider'
import AuthScreen from './AuthScreen'
import CalcFOBCard from './CalcFOBCard'
import CalcGPCard from './CalcGPCard'
import Container from './Container'

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
  header: null
}

export default withTheme(Home)
