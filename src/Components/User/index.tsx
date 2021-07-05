import React from 'react'
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import styles from './styles'

type Props = {
  onClosePress?: () => void
}
type State = {}

export default class UserComponent extends React.PureComponent<Props, State> {
  render() {
    const { onClosePress } = this.props

    return (
      <Animatable.View style={styles.container} animation={'fadeIn'}>
        <Pressable style={styles.backgroundButton} onPress={onClosePress}>
          <Animatable.View style={styles.content} animation={'fadeInUp'}>
            <Text style={styles.title}>{'New user'}</Text>
            <View style={styles.topInputContainer}>
              <TextInput style={styles.nameInput} placeholder={'Name'} />
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonTitle}>{'Add'}</Text>
            </TouchableOpacity>
          </Animatable.View>
        </Pressable>
      </Animatable.View>
    )
  }
}
