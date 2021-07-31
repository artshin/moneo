import { StyleSheet } from 'react-native'
import Colors from '@Utils/Colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: Colors.metallicSeaweed
  },

  headerTitle: {
    textAlign: 'left',
    fontSize: 36,
    color: Colors.white
  },

  headerSubtitle: {
    fontSize: 24,
    color: Colors.white
  },

  list: {
    // marginTop: 16,
    // backgroundColor: Colors.beaBlue
  },

  listSeparator: {
    height: 8
  }
})
