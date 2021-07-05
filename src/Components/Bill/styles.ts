import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white'
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16
  },

  billTitleInput: {
    marginTop: 16,
    fontSize: 18,
    borderWidth: 1,
    padding: 8,
    borderRadius: 10
  },

  userFlatListContainer: {
    flexDirection: 'row'
  },

  addUserButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8
  },

  addUserIcon: {},

  usersFlatList: {
    flexGrow: 0,
    marginTop: 8
  },

  listSeparator: {
    height: 8
  },

  addItemButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: 'black',
    marginVertical: 16,
    borderRadius: 10
  },

  addItemButtonTitle: {
    fontSize: 22,
    color: 'white'
  }
})
