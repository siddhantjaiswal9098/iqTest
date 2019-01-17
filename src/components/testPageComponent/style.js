import { StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import scale from '../../utils/scale';

const { height, width } = Dimensions.get('window');


module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#61abea'
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#61abea',
  },

  imageBackground: {
    position: 'absolute',
    height: scale(200),
    width: scale(200),
    borderRadius: scale(100),
    alignSelf: 'center',
    top: height / 2 - scale(150)
  },
  imageBackground2: {
    position: 'absolute',
    height: scale(200),
    width: scale(200),
    borderRadius: scale(100),
    alignSelf: 'center',
    top: height / 2 - scale(100)
  },
  prevBtn: {
    position: 'absolute',
    top: height / 2,
    left: 10,
    width: scale(30),
    zIndex: 5,
    justifyContent: 'center',
    padding: 5,
  },
  nextBtn: {
    position: 'absolute',
    top: height / 2,
    right: 10,
    width: scale(30),
    zIndex: 5,
    justifyContent: 'center',
    padding: 5,
  },
  TestIdView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
  },
  TestIdText: {
    fontSize: scale(24),
    color: 'white',
    fontWeight: 'bold',
  },
  TextTimer: {
    fontWeight: 'bold',
    fontSize: scale(20),
    color: 'white',
    position: 'absolute',
    top: getStatusBarHeight(true) + scale(5),
    right: scale(10)
  },
  submitView: {
    backgroundColor: 'white',
    marginVertical: scale(10),
    alignItems: 'center',
    width: width - scale(10),
    paddingVertical: scale(10),
    marginHorizontal: scale(5),
    paddingHorizontal: scale(10),
    borderRadius: scale(5),
    padding: scale(20)
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelBtnView: {
    height: scale(170),
    backgroundColor: 'white',
    opacity: 1,
    width: scale(250),
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: scale(10)
  },
  modalBtnText: {
    alignItems: 'flex-end',
    marginRight: scale(10),
    marginTop: scale(5),
    fontSize: scale(20)
  },
  okCancelView: {
    flexDirection: 'row',
    paddingHorizontal: scale(40),
    paddingVertical: scale(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelText: {
    padding: scale(10),
    backgroundColor: '#61abea',
    color: 'white',
    marginRight: scale(10)
  },
  okText: {
    padding: scale(10),
    backgroundColor: '#61abea',
    color: 'white'
  },
  takeAnotherTestView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: scale(10),
    zIndex: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',

  },
  takeAnotherTestView2: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: scale(50),
    zIndex: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',

  },
  takeAnotherTestText: {
    backgroundColor: '#FFF',
    padding: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerView: {
    flexDirection: 'row',
    backgroundColor: '#61abea',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(10)
  },
  headerText: {
    fontSize: scale(28),
    color: 'white',
    fontWeight: 'bold',
  },
  backBtnChat: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    left: scale(10),
    position: 'absolute',
    padding: scale(10)
  },
});
