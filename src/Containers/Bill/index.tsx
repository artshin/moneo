import React from 'react'
import BillComponent from '@Components/Bill'
import { StackNavigationProp } from '@react-navigation/stack'
import { NavigatorParamList, Screens } from '@Navigation/types'
import { RouteProp } from '@react-navigation/native'
import Bill from '@Models/Bill'
import User from '@Models/User'
import BillEntry from '@Models/BillEntry'

type NavigationProp = StackNavigationProp<NavigatorParamList, Screens.Bill>
type BillRouteProp = RouteProp<NavigatorParamList, Screens.Bill>

type Props = {
  navigation: NavigationProp
  route: BillRouteProp
}

type State = {
  bill: Bill
  users: User[]
  billEntries: BillEntry[]
}

class BillContainer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      bill: { ...props.route.params.bill },
      users: [], // TODO
      billEntries: [] // TODO
    }
  }

  render() {
    const { bill, users, billEntries } = this.state
    return (
      <BillComponent
        bill={bill}
        users={users}
        billEntries={billEntries}
        onAddBillEntryPress={this.onAddBillEntryPress}
      />
    )
  }

  private onAddBillEntryPress = () => {
    this.props.navigation.navigate(Screens.BillEntry, {})
  }
}

export default BillContainer
