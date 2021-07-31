import React from 'react'
import BillEntryComponent from '@Components/BillEntry/index'
import { StackNavigationProp } from '@react-navigation/stack'
import { NavigatorParamList, Screens } from '@Navigation/types'
import Bill from '@Models/Bill'
import { RouteProp } from '@react-navigation/native'
import { DataContext, DataContextType } from '@Contexts/Data'

type NavigationProp = StackNavigationProp<NavigatorParamList, Screens.Home>
type BillEntryRouteProp = RouteProp<NavigatorParamList, Screens.Bill>

type NavigationProps = {
  navigation: NavigationProp
  route: BillEntryRouteProp
}

type Props = NavigationProps & Pick<DataContextType, 'createBillEntry'>

type State = {
  bill: Bill
  name: string
  price: string
}

class BillEntryContainer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      bill: { ...props.route.params.bill },
      name: '',
      price: ''
    }
  }

  render() {
    const { name, price } = this.state

    return (
      <BillEntryComponent
        name={name}
        price={price}
        onClosePress={this.onClosePress}
        onNameChange={this.onNameChange}
        onPriceChange={this.onPriceChange}
        onAddPress={this.onAddPress}
      />
    )
  }

  private onClosePress = () => {
    this.props.navigation.pop()
  }

  private onNameChange = (value: string) => {
    this.setState({ name: value })
  }

  private onPriceChange = (value: string) => {
    this.setState({ price: value })
  }

  private onAddPress = async () => {
    const { createBillEntry, navigation } = this.props
    const { name, bill } = this.state

    if (name.length === 0) {
      return
    }

    await createBillEntry(bill, { name, price: '' })
    navigation.pop()
  }
}

function ContextWrapper(props: NavigationProps): React.ReactElement<Props> {
  return (
    <DataContext.Consumer>
      {({ createBillEntry }) => <BillEntryContainer {...props} createBillEntry={createBillEntry} />}
    </DataContext.Consumer>
  )
}

export default ContextWrapper
