import React from 'react'
import BillComponent from '@Components/Bill'
import { StackNavigationProp } from '@react-navigation/stack'
import { NavigatorParamList, Screens } from '@Navigation/types'
import { RouteProp } from '@react-navigation/native'
import Bill from '@Models/Bill'
import User from '@Models/User'
import BillEntry from '@Models/BillEntry'
import { DataContext, DataContextType } from '@Contexts/Data'

type NavigationProp = StackNavigationProp<NavigatorParamList, Screens.Bill>
type BillRouteProp = RouteProp<NavigatorParamList, Screens.Bill>

type NavigationProps = {
  navigation: NavigationProp
  route: BillRouteProp
}

type Props = NavigationProps &
  Pick<DataContextType, 'updateBill'> & {
    billEntries: BillEntry[]
    users: User[]
  }

type State = {
  bill: Bill
}

class BillContainer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      bill: { ...props.route.params.bill }
    }
  }

  componentDidMount() {
    this.listenToBackEvent()
  }

  render() {
    const { billEntries, users } = this.props
    const { bill } = this.state

    return (
      <BillComponent
        bill={bill}
        users={users}
        billEntries={billEntries}
        onNameChange={this.onNameChange}
        onAddBillEntryPress={this.onAddBillEntryPress}
        onAddUserPress={this.onAddUserPress}
      />
    )
  }

  private listenToBackEvent = () => {
    const { navigation, updateBill } = this.props
    const getBill = () => this.state.bill
    navigation.addListener('beforeRemove', e => {
      updateBill(getBill())
    })
  }

  private onAddBillEntryPress = () => {
    const { navigation } = this.props
    const { bill } = this.state

    navigation.navigate(Screens.BillEntry, { bill })
  }

  private onAddUserPress = () => {
    const { navigation } = this.props
    const { bill } = this.state

    navigation.navigate(Screens.User, { bill })
  }

  private onNameChange = (value: string) => {
    const { bill } = this.state

    this.setState({ bill: { ...bill, name: value } })
  }
}

function ContextWrapper(props: NavigationProps): React.ReactElement<Props> {
  return (
    <DataContext.Consumer>
      {({ billEntriesByBillId, usersByBillId, updateBill }) => {
        const { bill } = props.route.params
        const billEntries = billEntriesByBillId[bill.id]
        const users = usersByBillId[bill.id]

        return (
          <BillContainer
            {...props}
            billEntries={billEntries}
            updateBill={updateBill}
            users={users}
          />
        )
      }}
    </DataContext.Consumer>
  )
}

export default ContextWrapper
