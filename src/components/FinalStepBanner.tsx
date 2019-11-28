import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { Banner } from 'react-native-paper'

const FinalStepBanner: React.FC<{}> = () => {
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, 500)
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
          source={require('../../assets/yen.png')}
          style={{
            width: size,
            height: size
          }}
        />
      )}
      style={{ marginBottom: 8 }}
    >
      Use the currency picker to select your local currency and get the currency
      rate against USD.
    </Banner>
  )
}

export default FinalStepBanner
