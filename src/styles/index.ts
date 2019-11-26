import { StyleSheet } from 'react-native'
import { NavigationStackOptions } from 'react-navigation-stack'

export const globalStyles = StyleSheet.create({
  pageHeaderText: {
    color: '#30CC9A',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 15
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    color: 'grey',
    fontWeight: 'bold'
  },
  textInput: {
    marginBottom: 5,
    backgroundColor: '#181F26'
  },
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
  modalConfirmButton: {
    backgroundColor: '#30CC9A'
  }
})


