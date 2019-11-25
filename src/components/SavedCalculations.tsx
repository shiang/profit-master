import React, { useEffect, useContext, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack'
import Container from './Container'
import { Theme } from 'react-native-paper/lib/typescript/src/types'
import { AuthContext } from './AuthProvider'
import * as firebase from 'firebase'
import { withTheme, Card, Subheading, DataTable, Title, Headline, Divider, List } from 'react-native-paper'
import _ from 'underscore'
import { CalculatorState } from './CalculatorProvider'

interface Props {
  navigation: NavigationStackProp<{}>
  theme: Theme
}

interface NavOptions {
  navigationOptions: NavigationStackOptions
}

interface CalcHistoryData extends CalculatorState {
  id: string
  name: string
  gpInDollar: string
  gpInPercentage: string
}

const SavedCalculations: React.FC<Props> & NavOptions = ({ theme }) => {
  const { isLoggedIn, user } = useContext(AuthContext)
  const [ data, setData ] = useState<CalcHistoryData[] | null>(null)
  const [ expanded, setExpanded ] = useState<boolean>(false)

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
            <Card style={{ marginVertical: 8 }}>
              <Card.Title title={item.name} />
              <Divider style={{ marginBottom: 8 }} />
              <Card.Content>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold' }}>Gross Profit $</Text>
                    <Subheading>${item.gpInDollar}</Subheading>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold' }}>Gross Profit %</Text>
                    <Subheading>{item.gpInPercentage}</Subheading>
                  </View>
                </View>

                <List.Accordion title="Details">
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>Category</DataTable.Title>
                      <DataTable.Title>Value</DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                      <DataTable.Cell>Retail Price</DataTable.Cell>
                      <DataTable.Cell>${item.rrp}</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>Sales Tax</DataTable.Cell>
                      <DataTable.Cell>{item.gst}%</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>Dist'y Margin</DataTable.Cell>
                      <DataTable.Cell>{item.disty}%</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>Retailer Margin</DataTable.Cell>
                      <DataTable.Cell>{item.margin}%</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>Rebate</DataTable.Cell>
                      <DataTable.Cell>{item.rebate}%</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>FOB Price</DataTable.Cell>
                      <DataTable.Cell>${item.fobPrice}</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>FX Rate</DataTable.Cell>
                      <DataTable.Cell>{item.forexRate}</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>Freight</DataTable.Cell>
                      <DataTable.Cell>{item.freight}%</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>Landed Cost</DataTable.Cell>
                      <DataTable.Cell>${item.landedCost}</DataTable.Cell>
                    </DataTable.Row>

                  </DataTable>
                </List.Accordion>
              </Card.Content>
            </Card>
          )
        }}
      />
    </Container>
  )
}

SavedCalculations.navigationOptions = {
  title: 'Histories'
}

export default withTheme(SavedCalculations)
