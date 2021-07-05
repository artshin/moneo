import React from 'react'
import { View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Storybook from './Storybook'
import DevMenu from 'react-native-dev-menu'
import Navigator from '@Navigation/index'
import { DataProvider } from '@Contexts/Data'

const AppModeKey = 'AppMode'

enum AppMode {
  storybook = 'storybook',
  app = 'app',
  loading = 'loading'
}

type Props = {}
type State = {
  appMode: AppMode
}

class App extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      appMode: AppMode.loading
    }
  }

  componentDidMount() {
    this.loadStorybook()
  }

  render() {
    const { appMode } = this.state

    switch (appMode) {
      case AppMode.loading:
        return <View />
      case AppMode.storybook:
        return <Storybook />
      case AppMode.app:
        return (
          <DataProvider>
            <Navigator />
          </DataProvider>
        )
    }
  }

  private loadStorybook = async () => {
    if (__DEV__) {
      DevMenu.addItem('Toggle Storybook', this.toggleStorybook)
    }

    try {
      const value = (await AsyncStorage.getItem(AppModeKey)) || AppMode.app
      this.setState({ appMode: value as AppMode })
    } catch (e) {
      console.warn(e)
    }
  }

  private toggleStorybook = async () => {
    const { appMode } = this.state

    const newValue = appMode === AppMode.storybook ? AppMode.app : AppMode.storybook

    this.setState({ appMode: newValue })

    try {
      await AsyncStorage.setItem(AppModeKey, newValue)
    } catch (e) {
      console.warn(e)
    }
  }
}

export default App
