import React, { useEffect, useContext, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack'
import Container from './Container'
import { Theme } from 'react-native-paper/lib/typescript/src/types'
import { AuthContext } from './AuthProvider'
import * as firebase from 'firebase'
import { withTheme } from 'react-native-paper'
import _ from 'underscore'

interface Props {
  navigation: NavigationStackProp<{}>
  theme: Theme
}

interface NavOptions {
  navigationOptions: NavigationStackOptions
}

interface CalcHistoryData {
  id: string
  name: string
  gpInDollar: string
  gpInPercentage: string
}

const SavedCalculations: React.FC<Props> & NavOptions = ({ theme }) => {
  const { isLoggedIn, user } = useContext(AuthContext)
  const [ data, setData ] = useState<CalcHistoryData[] | null>(null)
  useEffect(() => {
    const getCalcData = () => {
      if (user) {
        const usersDbRef = firebase.database().ref('users')
        const userRef = usersDbRef.child(user.uid)
        const calcHistoriesRef = userRef.child('calcHistories')
        return calcHistoriesRef
          .once('value')
          .then(snapshot => snapshot.val())
          .then(val => {
            const data = _.mapObject(val, function(val, key) {
              return {
                id: key,
                ...val
              }
            })
            return data
          } )
      }
    }
    getCalcData().then(histories => {
      setData(Object.values(histories))

    })
  }, [])
  return data && (
    <Container {...{theme}}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.listItem}>
              <Text style={{ color: 'white' }}>{item.name}</Text>
              <Text style={{ color: 'white' }}>You are making ${item.gpInDollar}</Text>
              <Text style={{ color: 'white' }}>The gross profit percentage is %{item.gpInPercentage}</Text>
            </View>
          )
        }}
      />
    </Container>
  )
}

SavedCalculations.navigationOptions = {
  title: 'Saved Calculations'
}

const styles = StyleSheet.create({
  listItem: {
    marginVertical: 8
  }
})

export default withTheme(SavedCalculations)
