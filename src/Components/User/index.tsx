import React from 'react'
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import styles from './styles'

type Props = {
  name: string
  onClosePress?: () => void
  onNameChange?: (value: string) => void
  onConfirmPress?: () => void
}
type State = {}

export default class UserComponent extends React.PureComponent<Props, State> {
  render() {
    const { name, onClosePress, onNameChange, onConfirmPress } = this.props

    return (
      <Animatable.View style={styles.container} animation={'fadeIn'}>
        <Pressable style={styles.backgroundButton} onPress={onClosePress}>
          <Animatable.View style={styles.content} animation={'fadeInUp'}>
            <Text style={styles.title}>{'New user'}</Text>
            <View style={styles.topInputContainer}>
              <TextInput
                style={styles.nameInput}
                placeholder={'Name'}
                value={name}
                onChangeText={onNameChange}
              />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={onConfirmPress}>
              <Text style={styles.addButtonTitle}>{'Add'}</Text>
            </TouchableOpacity>
          </Animatable.View>
        </Pressable>
      </Animatable.View>
    )
  }
}
