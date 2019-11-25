import React, { useContext, useState } from 'react'
import { CalculatorContext } from './CalculatorProvider'
import { TextInput, Text, withTheme, Button } from 'react-native-paper'
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack'
import { Theme } from 'react-native-paper/lib/typescript/src/types'
import { globalStyles } from '../styles'
import Container from './Container'
import useForm from 'react-hook-form'

interface FormData {
  rrp: string
  gst: string
}

enum FieldName {
  rrp = 'rrp',
  gst = 'gst'
}

interface Props {
  navigation: NavigationStackProp<{}>
  theme: Theme
}

interface NavOptions {
  navigationOptions: NavigationStackOptions
}

const validationOptions = {
  required: 'This field is required',
  pattern: {
    value: /^(\d*\.)?\d+$/,
    message: 'Please enter a decimal value'
  }
}

const StepOne: React.FC<Props> & NavOptions = ({ navigation, theme }) => {
  const { dispatch } = useContext(CalculatorContext)
  const { register, setValue, handleSubmit, errors, clearError } = useForm<FormData>()

  const hasErrors = (fieldName: string) => {
    return Object.keys(errors).length > 0 && Object.keys(errors).includes(fieldName)
  }
  const onSubmit = (data: FormData) => {
    const { rrp, gst } = data
    dispatch({
      type: 'STEP_1',
      payload: {
        rrp,
        gst
      }
    })
    navigation.navigate('StepTwo')
  }
  return (
    <Container {...{theme}}>
        <Text style={globalStyles.pageHeaderText}>
          Please let us know
        </Text>
        <TextInput
          //@ts-ignore
          ref={register({
            name: FieldName.rrp
          }, validationOptions)}
          label='What is the desired retail price'
          keyboardType='numeric'
          contextMenuHidden
          style={globalStyles.textInput}
          placeholder={hasErrors(FieldName.rrp) ? '' : 'enter a price in your local currency'}
          onChangeText={(text) => setValue(FieldName.rrp, text)}
          error={hasErrors(FieldName.rrp)}
          onFocus={() => clearError(FieldName.rrp)}
        />
        {errors && errors.rrp && (
          <Text style={{ color: theme.colors.error, marginBottom: 5 }}>{errors.rrp.message}</Text>
        )}
        <TextInput
          // @ts-ignore
          ref={register({
            name: FieldName.gst
          }, validationOptions)}
          label='What is the local sales tax?'
          keyboardType='numeric'
          contextMenuHidden
          style={globalStyles.textInput}
          placeholder={hasErrors(FieldName.gst) ? '' : 'enter a value in percentage'}
          onChangeText={(text) => setValue(FieldName.gst, text)}
          error={hasErrors(FieldName.gst)}
          onFocus={() => clearError(FieldName.gst)}
        />
        {errors && errors.gst && (
          <Text style={{ color: theme.colors.error, marginBottom: 5 }}>{errors.gst.message}</Text>
        )}
        <Button
        mode='contained'
        style={{ marginTop: 5, backgroundColor: theme.colors.primary }}
        // @ts-ignore
        onPress={handleSubmit(onSubmit)}>
          Next
        </Button>
      </Container>
  )
}

StepOne.navigationOptions = {
  title: 'Step 1'
}

export default withTheme(StepOne)
