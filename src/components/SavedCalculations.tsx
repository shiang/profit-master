import axios from 'axios'
import * as FileSystem from 'expo-file-system'
import * as firebase from 'firebase'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Share, Text, View } from 'react-native'
import {
  ActivityIndicator,
  Card,
  DataTable,
  Divider,
  IconButton,
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
import getEnvVars from '../../environment'
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

  // const fileToBase64 = (filename: string, name: string) => {
  //   return new Promise(resolve => {
  //     var file = new File([filename], `${name}.csv`)
  //     var reader = new FileReader()
  //     // Read file content on file loaded event
  //     reader.onload = function(event) {
  //       resolve(event.target.result)
  //     }

  //     // Convert data to base64
  //     reader.readAsDataURL(file)
  //   })
  // }

  const onShare = async (index: number) => {
    const { calcCSVExportUrl } = getEnvVars()
    const res = await axios({
      method: 'post',
      url: calcCSVExportUrl,
      data: data[index]
    })

    if (res.status === 200) {
      const regex = / /g
      const fileName = data[index].name.replace(regex, '_')
      const path = FileSystem.documentDirectory + `/${fileName}.csv`
      await FileSystem.writeAsStringAsync(path, res.data, {
        encoding: 'utf8'
      })
      // console.log({ result })
      await Share.share(
        {
          title: 'Sharing calculation',
          url: path,
          message: 'You are sharing this calculation.'
        },
        {
          excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToWeibo',
            'com.apple.UIKit.activity.Print',
            'com.apple.UIKit.activity.CopyToPasteboard',
            'com.apple.UIKit.activity.AssignToContact',
            'com.apple.UIKit.activity.SaveToCameraRoll',
            'com.apple.UIKit.activity.AddToReadingList',
            'com.apple.UIKit.activity.PostToFlickr',
            'com.apple.UIKit.activity.PostToVimeo',
            'com.apple.UIKit.activity.PostToTencentWeibo',
            // 'com.apple.UIKit.activity.AirDrop',
            'com.apple.UIKit.activity.OpenInIBooks',
            'com.apple.UIKit.activity.MarkupAsPDF',
            'com.apple.reminders.RemindersEditorExtension',
            'com.apple.mobilenotes.SharingExtension',
            'com.apple.mobileslideshow.StreamShareService',
            'com.linkedin.LinkedIn.ShareExtension',
            'pinterest.ShareExtension',
            'com.google.GooglePlus.ShareExtension',
            'com.tumblr.tumblr.Share-With-Tumblr',
            'net.whatsapp.WhatsApp.ShareExtension' //WhatsApp
          ]
        }
      )
    }
  }

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
        renderItem={({ item, index }) => {
          return (
            <Card
              style={{ marginVertical: 8, backgroundColor: '#313B4A' }}
              elevation={3}
            >
              <Card.Title
                title={item.name}
                titleStyle={globalStyles.textBaseStyle}
                right={props => (
                  <IconButton
                    {...props}
                    icon='share'
                    onPress={() => {
                      onShare(index)
                    }}
                  />
                )}
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
  title: 'History'
}

export default withTheme(SavedCalculations)
