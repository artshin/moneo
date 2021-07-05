import React from 'react'
import { Animated, ViewProps } from 'react-native'

type Props = ViewProps & {
  children?: React.ReactNode | React.ReactNode[]
}

export default class FadeComponent extends React.PureComponent<Props, {}> {
  private backgroundOpacity = new Animated.Value(0)

  componentDidMount() {
    Animated.timing(this.backgroundOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start()
  }

  render() {
    const { style, children } = this.props

    return (
      <Animated.View style={[style, { opacity: this.backgroundOpacity }]}>{children}</Animated.View>
    )
  }

  public fadeOut = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      Animated.timing(this.backgroundOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start(() => {
        resolve()
      })
    })
  }
}
