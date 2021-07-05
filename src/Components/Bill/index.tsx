import React from 'react'
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import styles from './styles'
import BillEntryListItem from '@UI/BillEntryListItem'
import UserListItem from '@UI/UserListItem'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import Bill from '@Models/Bill'
import User from '@Models/User'
import BillEntry from '@Models/BillEntry'

type Props = {
  bill: Bill
  users: User[]
  billEntries: BillEntry[]
  onAddBillEntryPress?: () => void
}
type State = {}

class BillComponent extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { billEntries, onAddBillEntryPress } = this.props

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <FlatList
            data={billEntries}
            ListHeaderComponent={this.renderHeader}
            keyExtractor={this.billEntryListKeyExtractor}
            renderItem={this.renderBillListItem}
            ItemSeparatorComponent={this.renderSeparator}
          />
          <TouchableOpacity style={styles.addItemButton} onPress={onAddBillEntryPress}>
            <Text style={styles.addItemButtonTitle}>{'Add Item'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  private renderHeader = () => {
    const { bill, users } = this.props
    return (
      <View>
        <TextInput style={styles.billTitleInput} placeholder={'Title'} value={bill.name} />
        <View style={styles.userFlatListContainer}>
          <TouchableOpacity style={styles.addUserButton}>
            <EvilIcon name={'plus'} size={36} />
          </TouchableOpacity>
          <FlatList
            style={styles.usersFlatList}
            data={users}
            renderItem={this.renderUserListItem}
            keyExtractor={this.userListKeyExtractor}
            bounces={false}
            horizontal
          />
        </View>
      </View>
    )
  }

  private renderSeparator = () => <View style={styles.listSeparator} />

  private userListKeyExtractor = (item: User) => item.id
  private billEntryListKeyExtractor = (item: BillEntry) => item.id
  private renderUserListItem = ({ item }: { item: User }) => <UserListItem name={item.name} />
  private renderBillListItem = ({ item }: { item: BillEntry }) => {
    return <BillEntryListItem title={item.name} />
  }
}

export default BillComponent
