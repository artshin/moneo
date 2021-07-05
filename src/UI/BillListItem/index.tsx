import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Bill from '@Models/Bill'
import styles from './styles'

type Props = {
  bill: Bill
  onPress?: (bill: Bill) => void
}
type State = {}

export default class BillListItem extends React.PureComponent<Props, State> {
  render() {
    const { bill } = this.props

    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <Text>{bill.name}</Text>
        <Text>{'Split between:'}</Text>
      </TouchableOpacity>
    )
  }

  private onPress = () => {
    const { bill, onPress } = this.props
    onPress?.(bill)
  }
}
