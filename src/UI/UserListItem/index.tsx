import React from 'react'
import { Text, View } from 'react-native'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import styles from './styles'

type Props = {
  name: string
}
type State = {}

export default class UserListItem extends React.PureComponent<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <EvilIcon name={'user'} size={40} style={styles.icon} />
        <Text style={styles.title}>{this.props.name}</Text>
      </View>
    )
  }
}
