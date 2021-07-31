import React from 'react'
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import FadeComponent from '@UI/FadeComponent'
import styles from './styles'

type Props = {
  name: string
  price: string
  onClosePress?: () => void
  onNameChange?: (name: string) => void
  onPriceChange?: (name: string) => void
  onAddPress?: () => void
}
type State = {}

export default class BillEntryComponent extends React.PureComponent<Props, State> {
  private backgroundView: FadeComponent | null = null

  render() {
    const { name, price, onNameChange, onPriceChange, onAddPress } = this.props

    return (
      <FadeComponent ref={ref => (this.backgroundView = ref)} style={styles.container}>
        <Pressable style={styles.backgroundButton} onPress={this.onClosePress}>
          <Animatable.View style={styles.content} animation={'fadeInUp'}>
            <Text style={styles.title}>{'New bill entry'}</Text>
            <View style={styles.topInputContainer}>
              <TextInput
                style={styles.nameInput}
                placeholder={'Name'}
                onChangeText={onNameChange}
                value={name}
              />
              <TextInput
                style={styles.priceInput}
                placeholder={'0.0'}
                onChangeText={onPriceChange}
                value={price}
                keyboardType={'number-pad'}
              />
            </View>
            <View>
              <Text style={styles.usersTitle}>{'Split between:'}</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
              <Text style={styles.addButtonTitle}>{'Add'}</Text>
            </TouchableOpacity>
          </Animatable.View>
        </Pressable>
      </FadeComponent>
    )
  }

  private onClosePress = async () => {
    await this.backgroundView?.fadeOut()
    this.props.onClosePress?.()
  }
}
