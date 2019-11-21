import React from 'react'
import { View, Text, Button } from 'react-native'
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack'

interface Props {
  navigation: NavigationStackProp<{}>
}

interface NavOptions {
  navigationOptions: NavigationStackOptions
}

const Home: React.FC<Props> & NavOptions = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
      <Button
          title="Go to Calculator"
          onPress={() => navigation.navigate('StepOne')}
        />
    </View>
  )
}

Home.navigationOptions = {
  title: 'Home'
}

export default Home
