import React, { useState, useEffect } from 'react'
import { Banner } from 'react-native-paper'
import { Image, Animated } from 'react-native'


const FinalStepBanner: React.FC<{}> = () => {

  const [ visible, setVisible ] = useState<boolean>(true)

  const [ fadeAnim ] = useState(new Animated.Value(0))
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000
      }
    ).start()
  }, [])

  return (
    <Animated.View
      style={{
        opacity: fadeAnim
      }}
    >
      <Banner
          visible={visible}
          actions={[
            {
              label: 'Got it',
              onPress: () => setVisible(false),
            }
          ]}
          icon={({ size }) =>
            <Image
              source={{ uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4' }}
              style={{
                width: size,
                height: size,
              }}
            />
          }
          style={{ marginBottom: 8 }}
        >
          Use the country picker to select the country you are selling the product in and get the currency rate again USD.
        </Banner>
      </Animated.View>
  )
}

export default FinalStepBanner
