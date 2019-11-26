import React, { useState, useEffect } from 'react'
import { Banner } from 'react-native-paper'
import { Image, Animated, Easing } from 'react-native'

const FinalStepBanner: React.FC<{}> = () => {
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, 700)
  }, [])

  return (
    <Banner
      visible={visible}
      actions={[
        {
          label: 'Got it',
          onPress: () => setVisible(false)
        }
      ]}
      icon={({ size }) => (
        <Image
          source={{
            uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4'
          }}
          style={{
            width: size,
            height: size
          }}
        />
      )}
      style={{ marginBottom: 8 }}
    >
      Use the currency picker to select your local currency and get the currency
      rate again USD.
    </Banner>
  )
}

export default FinalStepBanner
