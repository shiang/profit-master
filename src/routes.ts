import { createStackNavigator } from 'react-navigation-stack'
import AccountScreen from './components/AccountScreen'
import FinalStep from './components/FinalStep'
import Home from './components/Home'
import Result from './components/Result'
import SavedCalculations from './components/SavedCalculations'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'

export const RootStack = createStackNavigator(
  {
    Home,
    StepOne,
    StepTwo,
    FinalStep,
    Result
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#000'
      },
      headerBackTitleStyle: {
        fontFamily: 'avenir-next-regular',
        fontSize: 20,
        marginTop: 6
      },
      headerTintColor: '#30CC9A',
      headerTitleStyle: {
        fontFamily: 'avenir-next-bold',
        fontSize: 25
      }
    }
  }
)

export const AccountStack = createStackNavigator(
  {
    Account: AccountScreen,
    SavedCalc: SavedCalculations
  },
  {
    initialRouteName: 'Account',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#000'
      },
      headerBackTitleStyle: {
        fontFamily: 'avenir-next-regular',
        fontSize: 20,
        marginTop: 6
      },
      headerTintColor: '#30CC9A',
      headerTitleStyle: {
        fontFamily: 'avenir-next-bold',
        fontSize: 25
      }
    }
  }
)
