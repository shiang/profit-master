import React from 'react'
import { Text, TextInput } from 'react-native'
import MyButton from './MyButton'
import { Formik } from 'formik'
import { Button } from 'react-native-paper'

interface FormValues {
  gst: string
  margin: string
  disty: string
  rebate: string
  fobPrice: string
  forexRate: string
  freight: string
  rrp: string
}

const Calculator: React.FC<{}> = () => {
  const initialValues: FormValues = {
    gst: '',
    margin: '',
    disty: '',
    rebate: '',
    fobPrice: '',
    forexRate: '',
    freight: '',
    rrp: ''
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        const { gst, margin, disty, rebate, fobPrice, forexRate, freight, rrp } = values
        const landedCost = (Number(fobPrice) / Number(forexRate)) * (1 + Number(freight) / 100)
        const gpInDollar = ((Number(rrp) / (1 + Number(gst) / 100)) * (1 - (Number(margin) / 100)) * (1 - (Number(disty) / 100))) - ((Number(rrp) / (1 + (Number(gst) / 100))) * (1 - (Number(margin) / 100)) * (Number(rebate) / 100)) - landedCost
        const gpInPercentage = (((Number(rrp) / (1 + Number(gst) / 100)) * (1 - (Number(margin) / 100)) * (1 - (Number(disty) / 100))) - (((Number(rrp) / (1 + (Number(gst) / 100))) * (1 - (Number(margin) / 100)) * (Number(rebate) / 100)) + landedCost)) / ((Number(rrp) / (1 + Number(gst) / 100)) * (1 - (Number(margin) / 100)) * (1 - (Number(disty) / 100)))
        alert(`${gpInDollar.toFixed(2)}, ${(gpInPercentage * 100).toFixed(2)}`)
      }}
    >
      {({ handleSubmit, handleChange, values}) => {
        return (
          <>
            <TextInput
              keyboardType='numeric'
              placeholder='Sales Tax (%)'
              onChangeText={handleChange('gst')}
              value={values.gst}
            />
            <TextInput
              keyboardType='numeric'
              placeholder='Desired Margin (%)'
              onChangeText={handleChange('margin')}
              value={values.margin}
            />
            <TextInput
              keyboardType='numeric'
              placeholder='Disty (%)'
              onChangeText={handleChange('disty')}
              value={values.disty}
            />
            <TextInput
              keyboardType='numeric'
              placeholder='Rebate (%)'
              onChangeText={handleChange('rebate')}
              value={values.rebate}
            />
            <TextInput
              keyboardType='numeric'
              placeholder='FOB ($)'
              onChangeText={handleChange('fobPrice')}
              value={values.fobPrice}
            />
            <TextInput
              keyboardType='numeric'
              placeholder='FX'
              onChangeText={handleChange('forexRate')}
              value={values.forexRate}
            />
            <TextInput
              keyboardType='numeric'
              placeholder='Freight'
              onChangeText={handleChange('freight')}
              value={values.freight}
            />
            <TextInput
              keyboardType='numeric'
              placeholder='RRP'
              onChangeText={handleChange('rrp')}
              value={values.rrp}
            />
            <Text>GP $:</Text>
            <Text>GP %:</Text>
            <MyButton handleSubmit={handleSubmit} />
          </>
        )
      }}
    </Formik>
  )
}

export default Calculator
