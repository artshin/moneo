import { StyleSheet } from 'react-native'
import Colors from '@Utils/Colors'

export default StyleSheet.create({
  container: {
    padding: 16,
    // borderRadius: 8,
    backgroundColor: Colors.prussianBlue,
    marginVertical: 16,
    minHeight: 128
  },
  icon: {},
  title: {
    marginTop: 8,
    fontSize: 24,
    color: Colors.white
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.white
  }
})
