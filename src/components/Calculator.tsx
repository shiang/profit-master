import React, { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import MyButton from './MyButton'

const Calculator: React.FC<{}> = () => {
  const [text, setText] = useState('')
  return (
    <View>
      <Text>Calculator!</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder='Sales Tax (%)'
        onChangeText={text => setText(text)}
        value={text}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder='Desired Margin (%)'
        onChangeText={text => setText(text)}
        value={text}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder='Disty (%)'
        onChangeText={text => setText(text)}
        value={text}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder='Rebate (%)'
        onChangeText={text => setText(text)}
        value={text}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder='Landed cost ($)'
        onChangeText={text => setText(text)}
        value={text}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder='FOB ($)'
        onChangeText={text => setText(text)}
        value={text}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder='Sales Tax (%)'
        onChangeText={text => setText(text)}
        value={text}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder='FX'
        onChangeText={text => setText(text)}
        value={text}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder='Freight'
        onChangeText={text => setText(text)}
        value={text}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder='RRP'
        onChangeText={text => setText(text)}
        value={text}
      />
      <Text>GP $:</Text>
      <Text>GP %:</Text>
      <MyButton />
    </View>
  )
}

export default Calculator
