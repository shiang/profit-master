import { StyleSheet } from 'react-native'

export const globalStyles = StyleSheet.create({
  textBaseStyle: {
    fontFamily: 'avenir-next-regular',
    color: '#30CC9A'
  },
  pageHeaderText: {
    color: '#30CC9A',
    fontFamily: 'avenir-next-bold',
    fontSize: 25,
    marginVertical: 10
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    color: 'grey',
    fontFamily: 'avenir-next-bold'
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
    fontFamily: 'avenir-next-bold',
    color: '#30CC9A',
    marginBottom: 8
  },
  modalConfirmButton: {
    backgroundColor: '#30CC9A'
  },
  homeCardTitle: {
    marginLeft: 15,
    fontSize: 18,
    fontFamily: 'avenir-next-bold'
  }
})

export const textInputLabelStyle = {
  fonts: {
    regular: {
      fontFamily: 'avenir-next-regular'
    }
  }
}
