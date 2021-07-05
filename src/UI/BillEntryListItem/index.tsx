import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

type Props = {
  title: string
}
type State = {}

export default class BillEntryListItem extends React.PureComponent<Props, State> {
  render() {
    const { title } = this.props
    return (
      <View style={styles.container}>
        <Text>{title}</Text>
        <Text>{'Split between:'}</Text>
      </View>
    )
  }
}
