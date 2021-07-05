import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000020'
  },

  backgroundButton: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16
    // backgroundColor: 'red'
  },

  content: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 8,
    backgroundColor: 'white'
  },

  title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 8,
    marginBottom: 16
  },

  topInputContainer: {
    flexDirection: 'row'
  },

  nameInput: {
    flex: 3,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 8,
    fontSize: 18
  },

  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 8,
    marginLeft: 8,
    fontSize: 18
  },

  usersTitle: {
    marginTop: 16,
    fontSize: 18
  },

  addButton: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: 'black'
  },

  addButtonTitle: {
    color: 'white',
    fontSize: 22
  }
})
