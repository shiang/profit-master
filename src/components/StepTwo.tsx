import React, { useContext, useEffect } from 'react'
import { Text, View } from 'react-native'
import { CalculatorContext } from './CalculatorProvider'
import { TextInput, Button, withTheme } from 'react-native-paper'
import {
  NavigationStackProp,
  NavigationStackOptions
} from 'react-navigation-stack'
import { globalStyles } from '../styles'
import { Theme } from 'react-native-paper/lib/typescript/src/types'
import Container from './Container'
import useForm from 'react-hook-form'

interface FormData {
  margin: string
  disty: string
  rebate: string
}

enum FieldName {
  margin = 'margin',
  disty = 'disty',
  rebate = 'rebate'
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

const StepTwo: React.FC<Props> & NavOptions = ({ navigation, theme }) => {
  const { dispatch } = useContext(CalculatorContext)
  const {
    register,
    setValue,
    handleSubmit,
    errors,
    clearError,
    watch
  } = useForm<FormData>()
  const marginValue = watch(FieldName.margin)
  const distyValue = watch(FieldName.disty)
  const rebateValue = watch(FieldName.rebate)

  useEffect(() => {
    register({ name: FieldName.margin })
    register({ name: FieldName.disty })
    register({ name: FieldName.rebate })
  }, [register])

  const hasErrors = (fieldName: string) => {
    return (
      Object.keys(errors).length > 0 && Object.keys(errors).includes(fieldName)
    )
  }

  const onSubmit = (data: FormData) => {
    const { margin, disty, rebate } = data
    dispatch({
      type: 'STEP_2',
      payload: {
        margin,
        disty,
        rebate
      }
    })
    navigation.navigate('FinalStep')
  }

  return (
    <Container {...{ theme }}>
      <View style={{ flex: 1 }}>
        <Text style={globalStyles.pageHeaderText}>
          Please help us understand your distribution strategy:
        </Text>
        <TextInput
          //@ts-ignore
          ref={register(
            {
              name: FieldName.margin
            },
            validationOptions
          )}
          label='Retailer Profit Margin'
          keyboardType='numeric'
          contextMenuHidden
          placeholder={
            hasErrors(FieldName.margin) ? '' : 'enter a value in percentage'
          }
          style={globalStyles.textInput}
          onChangeText={text => setValue(FieldName.margin, text)}
          error={hasErrors(FieldName.margin)}
          onFocus={() => clearError(FieldName.margin)}
          value={marginValue as string}
        />
        {errors && errors.margin && (
          <Text style={{ color: theme.colors.error, marginBottom: 5 }}>
            {errors.margin.message}
          </Text>
        )}
        <TextInput
          //@ts-ignore
          ref={register(
            {
              name: FieldName.disty
            },
            validationOptions
          )}
          label='Distributor Profit Margin'
          keyboardType='numeric'
          contextMenuHidden
          placeholder={
            hasErrors(FieldName.disty) ? '' : 'enter a value in percentage'
          }
          style={globalStyles.textInput}
          onChangeText={text => setValue(FieldName.disty, text)}
          error={hasErrors(FieldName.disty)}
          onFocus={() => clearError(FieldName.disty)}
          value={distyValue as string}
        />
        {errors && errors.disty && (
          <Text style={{ color: theme.colors.error, marginBottom: 5 }}>
            {errors.disty.message}
          </Text>
        )}
        <TextInput
          //@ts-ignore
          ref={register(
            {
              name: FieldName.rebate
            },
            validationOptions
          )}
          label='Rebate percentage'
          keyboardType='numeric'
          contextMenuHidden
          placeholder={
            hasErrors(FieldName.rebate) ? '' : 'enter a value in percentage'
          }
          style={globalStyles.textInput}
          onChangeText={text => setValue(FieldName.rebate, text)}
          error={hasErrors(FieldName.rebate)}
          onFocus={() => clearError(FieldName.rebate)}
          value={rebateValue as string}
        />
        {errors && errors.rebate && (
          <Text style={{ color: theme.colors.error, marginBottom: 5 }}>
            {errors.rebate.message}
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

StepTwo.navigationOptions = {
  title: 'Step 2'
}

export default withTheme(StepTwo)
