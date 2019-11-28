import React, { useContext, useEffect, useState } from 'react'
import useForm from 'react-hook-form'
import { View } from 'react-native'
import { Button, Text, TextInput, withTheme } from 'react-native-paper'
import { Theme } from 'react-native-paper/lib/typescript/src/types'
import {
  NavigationStackOptions,
  NavigationStackProp
} from 'react-navigation-stack'
import { globalStyles, textInputLabelStyle } from '../styles'
import { CalculatorContext } from './CalculatorProvider'
import Container from './Container'

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
  const {
    register,
    setValue,
    handleSubmit,
    errors,
    clearError,
    watch
  } = useForm<FormData>()
  const rrpValue = watch(FieldName.rrp)
  const gstValue = watch(FieldName.gst)

  useEffect(() => {
    register({ name: FieldName.rrp })
    register({ name: FieldName.gst })
  }, [register])

  const hasErrors = (fieldName: string) => {
    return (
      Object.keys(errors).length > 0 && Object.keys(errors).includes(fieldName)
    )
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
  const [rrp, setRrp] = useState<string>('')
  return (
    <Container {...{ theme }}>
      <View style={{ flex: 1 }}>
        <Text style={globalStyles.pageHeaderText}>Please let us know</Text>
        <TextInput
          //@ts-ignore
          ref={register(
            {
              name: FieldName.rrp
            },
            validationOptions
          )}
          label='Desired retail price'
          keyboardType='numeric'
          contextMenuHidden
          style={globalStyles.textInput}
          theme={textInputLabelStyle}
          placeholder={
            hasErrors(FieldName.rrp)
              ? ''
              : 'enter a price in your local currency'
          }
          onChangeText={text => setValue(FieldName.rrp, text)}
          error={hasErrors(FieldName.rrp)}
          onFocus={() => clearError(FieldName.rrp)}
          value={rrpValue as string}
        />
        {errors && errors.rrp && (
          <Text style={{ color: theme.colors.error, marginBottom: 5 }}>
            {errors.rrp.message}
          </Text>
        )}
        <TextInput
          // @ts-ignore
          ref={register(
            {
              name: FieldName.gst
            },
            validationOptions
          )}
          label='Local sales tax'
          keyboardType='numeric'
          contextMenuHidden
          style={globalStyles.textInput}
          theme={textInputLabelStyle}
          placeholder={
            hasErrors(FieldName.gst) ? '' : 'enter a value in percentage'
          }
          onChangeText={text => setValue(FieldName.gst, text)}
          error={hasErrors(FieldName.gst)}
          onFocus={() => clearError(FieldName.gst)}
          value={gstValue as string}
        />
        {errors && errors.gst && (
          <Text style={{ color: theme.colors.error, marginBottom: 5 }}>
            {errors.gst.message}
          </Text>
        )}
        <Button
          mode='contained'
          style={{ marginTop: 5, backgroundColor: theme.colors.primary }}
          // @ts-ignore
          onPress={handleSubmit(onSubmit)}
        >
          Next
        </Button>
      </View>
    </Container>
  )
}

StepOne.navigationOptions = {
  title: 'Step 1'
}

export default withTheme(StepOne)
