import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CalculatorContext } from './CalculatorProvider'
import { Button, Provider, Portal, Dialog, TextInput, withTheme } from 'react-native-paper'
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack'
import { NavigationActions } from 'react-navigation'
import * as firebase from 'firebase'
import { AuthContext } from './AuthProvider'
import { globalStyles } from '../styles'
import { Theme } from 'react-native-paper/lib/typescript/src/types'

interface Props {
  navigation: NavigationStackProp<{}>
  theme: Theme
}

interface NavOptions {
  navigationOptions: NavigationStackOptions
}


const Result: React.FC<Props> & NavOptions = ({ navigation, theme }) => {
  const { state, dispatch } = useContext(CalculatorContext)
  const { user } = useContext(AuthContext)

  const [ gpInDollar, setGpInDollar ] = useState<string | null>(null)
  const [ gpInPercentage, setGpInPercentage ] = useState<string | null>(null)
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)
  const [ resultName, setResultName ] = useState<string>('')

  useEffect(() => {
    const { gst, margin, disty, rebate, rrp, landedCost } = state
    const gpInDollar = ((Number(rrp) / (1 + Number(gst) / 100)) * (1 - (Number(margin) / 100)) * (1 - (Number(disty) / 100))) - ((Number(rrp) / (1 + (Number(gst) / 100))) * (1 - (Number(margin) / 100)) * (Number(rebate) / 100)) - Number(landedCost)
    const gpInPercentage = (((Number(rrp) / (1 + Number(gst) / 100)) * (1 - (Number(margin) / 100)) * (1 - (Number(disty) / 100))) - (((Number(rrp) / (1 + (Number(gst) / 100))) * (1 - (Number(margin) / 100)) * (Number(rebate) / 100)) + Number(landedCost))) / ((Number(rrp) / (1 + Number(gst) / 100)) * (1 - (Number(margin) / 100)) * (1 - (Number(disty) / 100)))
    setGpInDollar(gpInDollar.toFixed(2))
    setGpInPercentage(`${(gpInPercentage * 100).toFixed(2)}%`)
  })

  const showModal = () => {
    setIsModalVisible(true)
  }

  const hideModal = () => {
    setIsModalVisible(false)
  }

  const handleSaveResult = () => {
    const usersDbRef = firebase.database().ref('users')
    const userRef = usersDbRef.child(user.uid)
    const calcHistoriesRef = userRef.child('calcHistories')
    calcHistoriesRef.push().set({
      name: resultName,
      gpInDollar,
      gpInPercentage
    })
  }

  return (
    <Provider>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {gpInDollar && <Text>You are making ${gpInDollar}</Text>}
      {gpInPercentage && <Text>The gross profit percentage is {gpInPercentage}</Text>}
      <Button onPress={() => {
        if (user) {
          showModal()
        } else {
          navigation.navigate({ routeName: 'Account' })
        }
      }}>Save result</Button>
      <Button onPress={async () => {
        await dispatch({
          type: 'RESET'
        })
        navigation.reset([NavigationActions.navigate({ routeName: 'StepOne' })], 0)
      }}>
        Start Over
      </Button>
    </View>
    <Portal>
    <Dialog visible={isModalVisible} onDismiss={hideModal}>
      <View style={styles.modal}>
        <Text style={styles.modalTitle}>Enter a name to save</Text>
        <TextInput
        onChangeText={(text) => setResultName(text)}
        value={resultName}
        selectionColor='#30CC9A'
        underlineColor='#30CC9A'
        style={globalStyles.textInput}
        theme={{
          colors: {
            text: '#30CC9A'
          }
        }}
      />
      <Button
        style={styles.button}
        mode='contained'
        onPress={async () => {
        await handleSaveResult()
        setResultName('')
        hideModal()
      }}>Save</Button>
      </View>
    </Dialog>
    </Portal>
    </Provider>
  )
}

Result.navigationOptions = {
  title: 'Result'
}

const styles = StyleSheet.create({
  modal: {
    padding: 20,
    backgroundColor: '#000'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#30CC9A',
    marginBottom: 8
  },
  button: {
    backgroundColor: '#30CC9A'
  }
})

export default withTheme(Result)
