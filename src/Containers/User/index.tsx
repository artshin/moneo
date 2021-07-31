import React from 'react'
import UserComponent from '@Components/User/index'
import { StackNavigationProp } from '@react-navigation/stack'
import { NavigatorParamList, Screens } from '@Navigation/types'
import { DataContext, DataContextType } from '@Contexts/Data'
import { RouteProp } from '@react-navigation/native'
import Bill from '@Models/Bill'

type NavigationProp = StackNavigationProp<NavigatorParamList, Screens.User>
type UserRouteProp = RouteProp<NavigatorParamList, Screens.User>

type NavigationProps = {
  navigation: NavigationProp
  route: UserRouteProp
}

type Props = NavigationProps & Pick<DataContextType, 'createUser'>
type State = {
  name: string
  bill: Bill
}

class UserContainer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      name: '',
      bill: props.route.params.bill
    }
  }

  render() {
    const { name } = this.state

    return (
      <UserComponent
        name={name}
        onClosePress={this.onClosePress}
        onNameChange={this.onNameChange}
        onConfirmPress={this.onConfirmPress}
      />
    )
  }

  private onClosePress = () => {
    this.props.navigation.pop()
  }

  private onNameChange = (value: string) => {
    this.setState({ name: value })
  }

  private onConfirmPress = async () => {
    const { navigation, createUser } = this.props
    const { name, bill } = this.state

    if (name.length === 0) {
      return
    }

    await createUser(bill, { name })

    navigation.pop()
  }
}

function ContextWrapper(props: NavigationProps): React.ReactElement<Props> {
  return (
    <DataContext.Consumer>
      {({ createUser }) => <UserContainer {...props} createUser={createUser} />}
    </DataContext.Consumer>
  )
}

export default ContextWrapper
