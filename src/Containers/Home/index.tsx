import React from 'react'
import HomeComponent from '@Components/Home'
import { StackNavigationProp } from '@react-navigation/stack'
import { Screens, NavigatorParamList } from '@Navigation/types'
import { TouchableOpacity } from 'react-native'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import { DataContext, DataContextType } from '@Contexts/Data'
import styles from './styles'
import Bill from '@Models/Bill'
import Colors from '@Utils/Colors'

type NavigationProp = StackNavigationProp<NavigatorParamList, Screens.Home>

type NavigationProps = {
  navigation: NavigationProp
}

type Props = NavigationProps & Pick<DataContextType, 'bills' | 'createBill'>

type State = {}

class HomeContainer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    this.setNavigationOptions()
  }

  render() {
    const { bills } = this.props
    return <HomeComponent bills={bills} onBillListItemPress={this.onBillListItemPress} />
  }

  private setNavigationOptions = () => {
    const { navigation } = this.props

    navigation.setOptions({
      headerTitle: '',
      headerRight: () => (
        <TouchableOpacity style={styles.headerRight} onPress={this.onCreateBillPress}>
          <EvilIcon name={'plus'} size={32} color={Colors.white} />
        </TouchableOpacity>
      )
    })
  }

  private onCreateBillPress = async () => {
    const { navigation, createBill } = this.props
    const bill = await createBill()

    navigation.push(Screens.Bill, { bill })
  }

  private onBillListItemPress = (bill: Bill) => {
    const { navigation } = this.props
    navigation.push(Screens.Bill, { bill })
  }
}

function ContextWrapper(props: NavigationProps): React.ReactElement<Props> {
  return (
    <DataContext.Consumer>
      {({ bills, createBill }) => (
        <HomeContainer {...props} bills={bills} createBill={createBill} />
      )}
    </DataContext.Consumer>
  )
}

export default ContextWrapper
