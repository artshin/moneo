import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types'

import HomeContainer from '@Containers/Home'
import BillContainer from '@Containers/Bill'
import BillEntryContainer from '@Containers/BillEntry'

import { Screens } from './types'

const MainStack = createStackNavigator()
const RootStack = createStackNavigator()

type Props = {}
type State = {}

class MainNavigator extends React.PureComponent<Props, State> {
  private headerOptions: StackHeaderOptions = {
    headerStyle: {
      backgroundColor: 'white',
      shadowColor: 'transparent'
    },
    headerTintColor: 'black'
  } as const

  render() {
    return (
      <MainStack.Navigator screenOptions={this.headerOptions}>
        <MainStack.Screen name={Screens.Home} component={HomeContainer} />
        <MainStack.Screen name={Screens.Bill} component={BillContainer} />
      </MainStack.Navigator>
    )
  }
}

class RootNavigator extends React.PureComponent<Props, State> {
  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator mode={'modal'} headerMode={'none'}>
          <RootStack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              headerShown: false
            }}
          />
          <RootStack.Screen
            name={Screens.BillEntry}
            component={BillEntryContainer}
            options={{
              headerShown: false,
              animationEnabled: false,
              cardStyle: { backgroundColor: 'transparent' }
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    )
  }
}

export default RootNavigator
