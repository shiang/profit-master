import * as React from 'react'
import { Button } from 'react-native-paper'

interface Props {
  handleSubmit: () => void
}

const MyButton: React.FC<Props> = ({ handleSubmit }) => {
  return (
    <Button
      icon='calculator'
      mode='contained'
      onPress={handleSubmit}
    >Calculate</Button>
  )
}

export default MyButton
