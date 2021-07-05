import React from 'react'
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import FadeComponent from '@UI/FadeComponent'
import styles from './styles'

type Props = {
  onClosePress?: () => void
}
type State = {}

export default class BillEntryComponent extends React.PureComponent<Props, State> {
  private backgroundView: FadeComponent | null = null

  render() {
    return (
      <FadeComponent ref={ref => (this.backgroundView = ref)} style={styles.container}>
        <Pressable style={styles.backgroundButton} onPress={this.onClosePress}>
          <Animatable.View style={styles.content} animation={'fadeInUp'}>
            <Text style={styles.title}>{'New bill entry'}</Text>
            <View style={styles.topInputContainer}>
              <TextInput style={styles.nameInput} placeholder={'Name'} />
              <TextInput style={styles.priceInput} placeholder={'0.0'} />
            </View>
            <View>
              <Text style={styles.usersTitle}>{'Split between:'}</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
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
