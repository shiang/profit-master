import React, { useContext } from 'react'
import { Text } from 'react-native'
import { CalculatorContext } from './CalculatorProvider'
import { TextInput, Button, Theme, withTheme } from 'react-native-paper'
import { NavigationStackProp, NavigationStackOptions } from 'react-navigation-stack'
import { globalStyles } from '../styles'
import Container from './Container'
import useForm from 'react-hook-form'


interface FormData {
  fobPrice: string
  forexRate: string
  freight: string
  gpInPercentage: string
}

enum FieldName {
  fobPrice = 'fobPrice',
  forexRate = 'forexRate',
  freight = 'freight',
  gpInPercentage = 'gpInPercentage'
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

const FinalStep: React.FC<Props> & NavOptions = ({ navigation, theme }) => {
  const { dispatch, state } = useContext(CalculatorContext)
  const { register, setValue, handleSubmit, errors, clearError } = useForm<FormData>()

  const hasErrors = (fieldName: string) => {
    return Object.keys(errors).length > 0 && Object.keys(errors).includes(fieldName)
  }
  const onSubmit = (data: FormData) => {
    if (!state.isCalculateFob) {
      const { fobPrice, forexRate, freight } = data
      dispatch({
        type: 'FINAL_STEP',
        payload: {
          fobPrice,
          forexRate,
          freight,
          landedCost: (Number(fobPrice) / Number(forexRate) * (1 + Number(freight) / 100)).toFixed(2)
        }
      })
      navigation.navigate('Result')
    } else {
      const { gpInPercentage, forexRate, freight } = data
      const { rrp, margin, gst, disty, rebate } = state
      const priceAfterDisty = ((Number(rrp) / (1 + Number(gst) / 100)) * (1 - (Number(margin) / 100)) * (1 - (Number(disty) / 100)))
      const gpInDollar = priceAfterDisty * (Number(gpInPercentage) / 100)
      const landedCost = ((priceAfterDisty - gpInDollar) - ((Number(rrp) / (1 + Number(gst) / 100)) * (1 - (Number(margin) / 100)) * (Number(rebate) / 100)))
      const fobPrice = landedCost / (1 + (Number(freight) / 100)) * Number(forexRate)

      dispatch({
        type: 'FOB_FINAL_STEP',
        payload: {
          gpInPercentage,
          forexRate,
          freight,
          fobPrice: fobPrice.toFixed(2),
          gpInDollar: gpInDollar.toFixed(2),
          landedCost: landedCost.toFixed(2)
        }
      })
      navigation.navigate('Result')
    }
  }

  return (
    <Container {...{theme}}>
      <Text style={globalStyles.pageHeaderText}>Please help us understand your pricing structure:</Text>
      {!state.isCalculateFob && <TextInput
        //@ts-ignore
        ref={register({
          name: FieldName.fobPrice
        }, validationOptions)}
        label='What is the FOB price?'
        keyboardType='numeric'
        contextMenuHidden
        placeholder={hasErrors(FieldName.fobPrice) ? '' : 'enter a price in your local currency'}
        style={globalStyles.textInput}
        onChangeText={(text) => setValue(FieldName.fobPrice, text)}
        error={hasErrors(FieldName.fobPrice)}
        onFocus={() => clearError(FieldName.fobPrice)}
      />}
      {errors && errors.fobPrice && !state.isCalculateFob && (
          <Text style={{ color: theme.colors.error, marginBottom: 5 }}>{errors.fobPrice.message}</Text>
        )}

      {state.isCalculateFob && <TextInput
        //@ts-ignore
        ref={register({
          name: FieldName.gpInPercentage
        }, validationOptions)}
        label='Desired gross profit in %'
        keyboardType='numeric'
        contextMenuHidden
        placeholder={hasErrors(FieldName.gpInPercentage) ? '' : 'enter a value in %'}
        style={globalStyles.textInput}
        onChangeText={(text) => setValue(FieldName.gpInPercentage, text)}
        error={hasErrors(FieldName.gpInPercentage)}
        onFocus={() => clearError(FieldName.gpInPercentage)}
      />}
      {errors && errors.gpInPercentage && state.isCalculateFob && (
          <Text style={{ color: theme.colors.error, marginBottom: 5 }}>{errors.gpInPercentage.message}</Text>
      )}
      <TextInput
        //@ts-ignore
        ref={register({
          name: FieldName.forexRate
        }, validationOptions)}
        label='Local currency rate'
        keyboardType='numeric'
        contextMenuHidden
        placeholder={hasErrors(FieldName.forexRate) ? '' : 'enter 1 if you are trading in USD'}
        style={globalStyles.textInput}
        onChangeText={(text) => setValue(FieldName.forexRate, text)}
        error={hasErrors(FieldName.forexRate)}
        onFocus={() => clearError(FieldName.forexRate)}
      />
      {errors && errors.forexRate && (
          <Text style={{ color: theme.colors.error, marginBottom: 5 }}>{errors.forexRate.message}</Text>
        )}
      <TextInput
        //@ts-ignore
        ref={register({
          name: FieldName.freight
        }, validationOptions)}
        label='Freight cost percentage?'
        keyboardType='numeric'
        contextMenuHidden
        placeholder={hasErrors(FieldName.freight) ? '' : 'Normally between 3 ~ 5%'}
        style={globalStyles.textInput}
        onChangeText={(text) => setValue(FieldName.freight, text)}
        error={hasErrors(FieldName.freight)}
        onFocus={() => clearError(FieldName.freight)}
      />
      {errors && errors.freight && (
          <Text style={{ color: theme.colors.error, marginBottom: 5 }}>{errors.freight.message}</Text>
        )}
      <Button
      mode='contained'
      style={{ marginTop: 5, backgroundColor: theme.colors.primary }}
      // @ts-ignore
      onPress={handleSubmit(onSubmit)}>
        See Result
      </Button>
    </Container>
  )
}

FinalStep.navigationOptions = {
  title: 'Final Step'
}

export default withTheme(FinalStep)
