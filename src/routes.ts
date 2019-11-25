import { createStackNavigator } from 'react-navigation-stack';
import Home from './components/Home'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'
import FinalStep from './components/FinalStep'
import Result from './components/Result'
import AccountScreen from './components/AccountScreen';
import SavedCalculations from './components/SavedCalculations';

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
      headerTintColor: '#30CC9A',
      headerTitleStyle: {
        fontWeight: 'bold',
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
      headerTintColor: '#30CC9A',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 25
      }
    }
  }
)
