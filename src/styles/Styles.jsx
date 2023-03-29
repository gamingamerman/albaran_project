import { StyleSheet } from "react-native";

const mainScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030'
  },
  topContainer: {
    flex: 0.7,
    flexDirection: 'row-reverse',
  },
  addContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 4.6,
  },
  navContainer: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopColor: 'white',
    borderTopWidth: 5,
  },

  addBtn: {
    width: '80%',
    height: '80%',
    marginTop: '5%',
    backgroundColor: '#191919',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 2
  },
  addIcon: {
    alignSelf: 'center'
  },
  albaranContainer: {
    marginTop: '10%',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  }
});

const settingsScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030'
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  bodyContainer: {
    flex: 6,
    justifyContent: 'center',
  },
  formContainer: {
    // borderWidth: 2,
    // borderColor: 'red',
    justifyContent: 'space-evenly',
    height: '40%',
    marginBottom: '50%',
    marginHorizontal: '10%'
  },
  navContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopColor: 'white',
    borderTopWidth: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#191919',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

const formScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030'
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },
  bodyContainer: {
    flex: 6,
    justifyContent: 'center',
  },
  formContainer: {
    // borderWidth: 2,
    // borderColor: 'red',
    justifyContent: 'space-evenly',
    height: '40%',
    marginBottom: '50%',
    marginHorizontal: '10%'
  },
  navContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopColor: 'white',
    borderTopWidth: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#191919',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

const albaranScreenDetail = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
  },
  topContainer: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: '5%'
  },
  titleCard: {
    flex: 2,
    // backgroundColor: 'blue',
    justifyContent: 'center',
  },
  albaranCode: {
    flex: 1,
    justifyContent: 'center'
  },
  codeStyle: {
    alignSelf: 'center',
    marginRight: '25%',
  },
  bodyContainer: {
    flex: 5,
    marginHorizontal: '5%'
  },
  actionContainer: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'

  },
  mailContainer: {
    backgroundColor: 'black',
    height: '70%',
    width: '22%',
    borderRadius: 50,
    justifyContent: 'center',
  },
  mailIcon: {
    height: '70%',
    width: '100%',
    margin: 10,
    marginLeft: '15%'
    // flexDirection: ''
  },
  addIcon: {
    height: '70%',
    width: '100%',
    margin: 10,
    marginLeft: '20%'
  },
  addContainer: {
    backgroundColor: 'black',
    height: '70%',
    width: '22%',
    borderRadius: 50
  },
  navContainer: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopColor: 'white',
    borderTopWidth: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#191919',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 13,
    elevation: 2,
    marginHorizontal: 20
  },
  buttonClose: {
    backgroundColor: 'white',
  },
  buttonRemove: {
    backgroundColor: 'red'
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const albaranStyle = StyleSheet.create({
  albaranTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '5%',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    borderTopColor: 'white',
    borderTopWidth: 2
  },
  albaranRegistry: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: '5%',
    fontWeight: 'bold'
  },
  albaranInnerText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: '5%'
  },
  albaranEmptyText: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: '5%',
    fontWeight: 'bold'
  }
})

const productStyle = StyleSheet.create({
  tableStyle: {
    marginTop: '5%'
  },
  text: {
    margin: 6,
    fontSize: 16,
    textAlign: 'center',
  },
  rowStyle: {
    marginTop: 15
  }
})

const scannerScreen = StyleSheet.create({
  modalView: {
    margin: 20,
    marginTop: '25%',
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  bottomStyle: {
    width: '100%',
  },
  iconStyle: {
    marginLeft: '10%'
  }
})

const editAlbaranScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },
  bodyContainer: {
    flex: 6,
    justifyContent: 'center',
  },
  formContainer: {
    justifyContent: 'space-evenly',
    height: '40%',
    marginBottom: '50%',
    marginHorizontal: '10%'
  },
  navContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderTopColor: 'white',
    borderTopWidth: 5,
  },
  centeredView: {
    marginTop: '50%'
  },
  modalView: {
    margin: 20,
    backgroundColor: '#191919',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 13,
    elevation: 2,
    marginHorizontal: 20
  },
  buttonClose: {
    backgroundColor: 'white',
  },
  buttonRemove: {
    backgroundColor: 'red'
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export {
  mainScreen,
  settingsScreen,
  formScreen,
  albaranScreenDetail,
  albaranStyle,
  productStyle,
  scannerScreen,
  editAlbaranScreen
}