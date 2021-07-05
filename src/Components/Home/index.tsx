import Bill from '@Models/Bill'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import BillListItem from '@UI/BillListItem/index'
import styles from './styles'

type Props = {
  bills: Bill[]
  onBillListItemPress?: (bill: Bill) => void
}
type State = {}

class HomeComponent extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { bills } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{'Moneo\nSplit your bills with ease'}</Text>
        <FlatList
          style={styles.list}
          data={bills}
          keyExtractor={this.billListKeyExtractor}
          renderItem={this.renderBillListItem}
          ItemSeparatorComponent={this.renderListSeparator}
        />
      </View>
    )
  }

  private billListKeyExtractor = (item: Bill) => item.id

  private renderBillListItem = ({ item }: { item: Bill }) => {
    const { onBillListItemPress } = this.props
    return <BillListItem bill={item} onPress={onBillListItemPress} />
  }

  private renderListSeparator = () => <View style={styles.listSeparator} />
}

export default HomeComponent
