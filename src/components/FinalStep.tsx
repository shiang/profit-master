import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import useForm from 'react-hook-form'
import {
  Button as NativeButton,
  Keyboard,
  Picker,
  Text,
  View
} from 'react-native'
import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  Snackbar,
  TextInput,
  Theme,
  withTheme
} from 'react-native-paper'
import {
  NavigationStackOptions,
  NavigationStackProp
} from 'react-navigation-stack'
import _ from 'underscore'
import getEnvVars from '../../environment'
import { globalStyles, textInputLabelStyle } from '../styles'
import { CalculatorContext } from './CalculatorProvider'
import Container from './Container'
import FinalStepBanner from './FinalStepBanner'
import { useCountriesQuery } from './generated/graphql'

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
  const { fxAPIKey } = getEnvVars()
  const { dispatch, state } = useContext(CalculatorContext)
  const {
    register,
    setValue,
    handleSubmit,
    errors,
    clearError,
    watch
  } = useForm<FormData>()
  const forexRateValue = watch(FieldName.forexRate)
  const gpInPercentageValue = watch(FieldName.gpInPercentage)
  const fobPriceValue = watch(FieldName.fobPrice)
  const freightValue = watch(FieldName.freight)

  const [displaySnackbar, setDisplaySnackbar] = useState<boolean>(false)

  let currencies
  const [res] = useCountriesQuery()

  const hasErrors = (fieldName: string) => {
    return (
      Object.keys(errors).length > 0 && Object.keys(errors).includes(fieldName)
    )
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
          landedCost: (
            (Number(fobPrice) / Number(forexRate)) *
            (1 + Number(freight) / 100)
          ).toFixed(2)
        }
      })
      navigation.navigate('Result')
    } else {
      const { gpInPercentage, forexRate, freight } = data
      const { rrp, margin, gst, disty, rebate } = state
      const priceAfterDisty =
        (Number(rrp) / (1 + Number(gst) / 100)) *
        (1 - Number(margin) / 100) *
        (1 - Number(disty) / 100)
      const gpInDollar = priceAfterDisty * (Number(gpInPercentage) / 100)
      const landedCost =
        priceAfterDisty -
        gpInDollar -
        (Number(rrp) / (1 + Number(gst) / 100)) *
          (1 - Number(margin) / 100) *
          (Number(rebate) / 100)
      const fobPrice =
        (landedCost / (1 + Number(freight) / 100)) * Number(forexRate)

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

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const showModal = () => {
    setIsModalVisible(true)
  }

  const hideModal = () => {
    setIsModalVisible(false)
  }

  useEffect(() => {
    register({ name: FieldName.forexRate })
    register({ name: FieldName.gpInPercentage })
    register({ name: FieldName.fobPrice })
    register({ name: FieldName.freight })
  }, [register])

  const [currency, setCurrency] = useState<string>('')
  const [isFetchingCurrencyRate, setIsFetchingCurrencyRate] = useState<boolean>(
    false
  )
  const getCurrencyRate = async () => {
    setIsFetchingCurrencyRate(true)
    try {
      const data = await axios.get(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${currency}&to_currency=USD&apikey=${fxAPIKey}`
      )
      if (data.status === 200) {
        setIsFetchingCurrencyRate(false)
        setValue(
          FieldName.forexRate,
          Number(
            data.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
          ).toFixed(4)
        )
      }
    } catch (err) {
      if (err) {
        setIsFetchingCurrencyRate(false)
        setDisplaySnackbar(true)
      }
    }
  }

  if (res.fetching) {
    return (
      <Container {...{ theme }}>
        <ActivityIndicator animating color={theme.colors.primary} />
      </Container>
    )
  }

  if (res.data && res.data.countries) {
    currencies = _.uniq(
      res.data.countries
        .filter((country, i) => {
          return !country.currency.includes(',') && country.currency.length > 0
        })
        .map(item => item.currency)
    )

    currencies.unshift('')
  }

  return (
    <Container {...{ theme }}>
      <View style={{ flex: 1 }}>
        <FinalStepBanner />
        <Text style={globalStyles.pageHeaderText}>
          Please help us understand your pricing structure:
        </Text>
        {!state.isCalculateFob && (
          <TextInput
            //@ts-ignore
            ref={register(
              {
                name: FieldName.fobPrice
              },
              validationOptions
            )}
            label='What is the FOB price?'
            keyboardType='numeric'
            contextMenuHidden
            placeholder={
              hasErrors(FieldName.fobPrice)
                ? ''
                : 'enter a price in your local currency'
            }
            style={globalStyles.textInput}
            theme={textInputLabelStyle}
            onChangeText={text => setValue(FieldName.fobPrice, text)}
            error={hasErrors(FieldName.fobPrice)}
            onFocus={() => clearError(FieldName.fobPrice)}
            value={fobPriceValue as string}
          />
        )}
        {errors && errors.fobPrice && !state.isCalculateFob && (
          <Text style={{ color: theme.colors.error, marginBottom: 5 }}>
            {errors.fobPrice.message}
          </Text>
        )}

        {state.isCalculateFob && (
          <TextInput
            //@ts-ignore
            ref={register(
              {
                name: FieldName.gpInPercentage
              },
              validationOptions
            )}
            label='Desired gross profit in %'
            keyboardType='numeric'
            contextMenuHidden
            placeholder={
              hasErrors(FieldName.gpInPercentage) ? '' : 'enter a value in %'
            }
            style={globalStyles.textInput}
            onChangeText={text => setValue(FieldName.gpInPercentage, text)}
            error={hasErrors(FieldName.gpInPercentage)}
            onFocus={() => clearError(FieldName.gpInPercentage)}
            value={gpInPercentageValue as string}
          />
        )}
        {errors && errors.gpInPercentage && state.isCalculateFob && (
          <Text style={{ color: theme.colors.error, marginBottom: 5 }}>
            {errors.gpInPercentage.message}
          </Text>
        )}
        <TextInput
          //@ts-ignore
          ref={register(
            {
              name: FieldName.forexRate
            },
            validationOptions
          )}
          label='Local currency rate'
          keyboardType='numeric'
          contextMenuHidden
          placeholder={
            hasErrors(FieldName.forexRate)
              ? ''
              : 'enter 1 if you are trading in USD'
          }
          style={globalStyles.textInput}
          theme={textInputLabelStyle}
          onChangeText={text => setValue(FieldName.forexRate, text)}
          error={hasErrors(FieldName.forexRate)}
          onFocus={() => clearError(FieldName.forexRate)}
          value={
            isFetchingCurrencyRate
              ? 'Retrieving...'
              : (forexRateValue as string)
          }
        />
        {errors && errors.forexRate && (
          <Text style={{ color: theme.colors.error, marginBottom: 5 }}>
            {errors.forexRate.message}
          </Text>
        )}

        <NativeButton
          title='Or use currency picker'
          disabled={isFetchingCurrencyRate}
          onPress={() => {
            Keyboard.dismiss()
            showModal()
          }}
        />

        <TextInput
          //@ts-ignore
          ref={register(
            {
              name: FieldName.freight
            },
            validationOptions
          )}
          label='Freight cost percentage?'
          keyboardType='numeric'
          contextMenuHidden
          placeholder={
            hasErrors(FieldName.freight) ? '' : 'Normally between 3 ~ 5%'
          }
          style={{
            ...globalStyles.textInput,
            marginTop: 5
          }}
          theme={textInputLabelStyle}
          onChangeText={text => setValue(FieldName.freight, text)}
          error={hasErrors(FieldName.freight)}
          onFocus={() => clearError(FieldName.freight)}
          value={freightValue as string}
        />

        {errors && errors.freight && (
          <Text style={{ color: theme.colors.error, marginBottom: 5 }}>
            {errors.freight.message}
          </Text>
        )}
        <Button
          mode='contained'
          style={{ marginTop: 5, backgroundColor: theme.colors.primary }}
          // @ts-ignore
          onPress={handleSubmit(onSubmit)}
        >
          See Result
        </Button>

        <Portal>
          <Dialog visible={isModalVisible} onDismiss={hideModal}>
            <View style={globalStyles.modal}>
              <Text style={globalStyles.modalTitle}>Select a country</Text>
              <Picker
                selectedValue={currency}
                style={{ backgroundColor: 'white' }}
                onValueChange={(val, idx) => {
                  setCurrency(val)
                }}
              >
                {currencies &&
                  currencies.map((currency, i) => {
                    return (
                      <Picker.Item label={currency} value={currency} key={i} />
                    )
                  })}
              </Picker>
              <Button
                style={{
                  ...globalStyles.modalConfirmButton,
                  marginTop: 8
                }}
                mode='contained'
                disabled={currency.length === 0}
                onPress={() => {
                  getCurrencyRate()
                  hideModal()
                }}
              >
                Save
              </Button>
            </View>
          </Dialog>
        </Portal>

        <Snackbar
          visible={displaySnackbar}
          onDismiss={() => setDisplaySnackbar(false)}
          action={{
            label: 'OK',
            onPress: () => {
              setDisplaySnackbar(false)
            }
          }}
        >
          This country is not yet supported.
        </Snackbar>
      </View>
    </Container>
  )
}

FinalStep.navigationOptions = {
  title: 'Final Step'
}

export default withTheme(FinalStep)
