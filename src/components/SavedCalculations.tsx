import * as firebase from 'firebase'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import {
  ActivityIndicator,
  Card,
  DataTable,
  Divider,
  List,
  Subheading,
  withTheme
} from 'react-native-paper'
import { Theme } from 'react-native-paper/lib/typescript/src/types'
import {
  NavigationStackOptions,
  NavigationStackProp
} from 'react-navigation-stack'
import _ from 'underscore'
import { globalStyles } from '../styles'
import { AuthContext } from './AuthProvider'
import { CalculatorState } from './CalculatorProvider'
import Container from './Container'

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
  const [data, setData] = useState<CalcHistoryData[] | null>(null)
  const [expanded, setExpanded] = useState<boolean>(false)

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
          })
      }
    }
    getCalcData().then(histories => {
      setData(Object.values(histories))
    })
  }, [user])

  if (!data) {
    return (
      <Container {...{ theme }}>
        <ActivityIndicator animating color={theme.colors.primary} />
      </Container>
    )
  }
  return (
    <Container {...{ theme }}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          paddingVertical: 10
        }}
        renderItem={({ item }) => {
          return (
            <Card
              style={{ marginVertical: 8, backgroundColor: '#313B4A' }}
              elevation={3}
            >
              <Card.Title
                title={item.name}
                titleStyle={globalStyles.textBaseStyle}
              />
              <Divider style={{ marginBottom: 8 }} />
              <Card.Content>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly'
                  }}
                >
                  <View style={{ alignItems: 'center' }}>
                    <Text
                      style={{ ...globalStyles.textBaseStyle, color: 'white' }}
                    >
                      Gross Profit $
                    </Text>
                    <Subheading>${item.gpInDollar}</Subheading>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <Text
                      style={{ ...globalStyles.textBaseStyle, color: 'white' }}
                    >
                      Gross Profit %
                    </Text>
                    <Subheading>{item.gpInPercentage}</Subheading>
                  </View>
                </View>

                <List.Accordion
                  title='Details'
                  titleStyle={globalStyles.textBaseStyle}
                >
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>
                        <Text style={globalStyles.textBaseStyle}>Category</Text>
                      </DataTable.Title>
                      <DataTable.Title>
                        <Text style={globalStyles.textBaseStyle}>Value</Text>
                      </DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                      <DataTable.Cell>
                        <Text style={globalStyles.textBaseStyle}>
                          Retail Price
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text style={globalStyles.textBaseStyle}>
                          ${item.rrp}
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>
                        <Text style={globalStyles.textBaseStyle}>
                          Sales Tax
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text style={globalStyles.textBaseStyle}>
                          {item.gst}%
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>
                        <Text style={globalStyles.textBaseStyle}>
                          Disty Margin
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text style={globalStyles.textBaseStyle}>
                          {item.disty}%
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>
                        <Text style={globalStyles.textBaseStyle}>
                          Retailer Margin
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text style={globalStyles.textBaseStyle}>
                          {item.margin}%
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>
                        <Text style={globalStyles.textBaseStyle}>Rebate</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text style={globalStyles.textBaseStyle}>
                          {item.rebate}%
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>
                        <Text style={globalStyles.textBaseStyle}>
                          FOB Price
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text style={globalStyles.textBaseStyle}>
                          ${item.fobPrice} (USD)
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>
                        <Text style={globalStyles.textBaseStyle}>FX Rate</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text style={globalStyles.textBaseStyle}>
                          {item.forexRate}
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>
                        <Text style={globalStyles.textBaseStyle}>Freight</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text style={globalStyles.textBaseStyle}>
                          {item.freight}%
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                      <DataTable.Cell>
                        <Text style={globalStyles.textBaseStyle}>
                          Landed Cost
                        </Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text style={globalStyles.textBaseStyle}>
                          ${item.landedCost}
                        </Text>
                      </DataTable.Cell>
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
