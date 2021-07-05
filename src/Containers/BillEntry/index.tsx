import React from 'react'
import BillEntryComponent from '@Components/BillEntry/index'
import { StackNavigationProp } from '@react-navigation/stack'
import { NavigatorParamList, Screens } from '@Navigation/types'

type NavigationProp = StackNavigationProp<NavigatorParamList, Screens.BillEntry>

type Props = {
  navigation: NavigationProp
}
type State = {}

export default class BillEntry extends React.PureComponent<Props, State> {
  render() {
    return <BillEntryComponent onClosePress={this.onClosePress} />
  }

  private onClosePress = () => {
    this.props.navigation.pop()
  }
}
