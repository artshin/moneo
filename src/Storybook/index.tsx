import React from 'react'
import { getStorybookUI, configure } from '@storybook/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

// import stories
configure(() => {
  require('./stories')
}, module)

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUIRoot = getStorybookUI({
  port: 7008,
  onDeviceUI: true,
  asyncStorage: AsyncStorage,
  shouldDisableKeyboardAvoidingView: true,
  isUIHidden: false
})

// react-native hot module loader must take in a Class - https://github.com/facebook/react-native/issues/10991
// https://github.com/storybooks/storybook/issues/2081
const storybook: React.FC<unknown> = () => {
  return <StorybookUIRoot />
}

export default storybook
