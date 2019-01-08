/* eslint-disable no-undef */
import { StyleSheet } from 'react-native';
import scale from '../../utils/scale';


module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#61abea'
  },
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#61abea',
    padding: scale(20),
  },
  avatarContainer: {
    marginBottom: scale(20),
    marginTop: scale(20),
    width: window.width,
    alignItems: 'center',
  },
  avatar: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(24),
  },
  name: {
    color: 'white',
  },
  email: {
    color: 'white',
    fontSize: scale(17)
  },
  item: {
    color: 'white',
    fontSize: scale(20),
    fontWeight: 'bold',
    marginLeft: 5,
    padding: scale(5)
  },
  AppLogo: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(40),
    borderWidth: 3,
    borderColor: 'white'
  },
  iqTestFooter: {
    fontSize: scale(25),
    marginLeft: scale(5),
    color: 'white',
    fontWeight: 'bold'
  },
  iqTestFooterVersion: {
    fontSize: scale(15),
    marginLeft: scale(15),
    marginTop: scale(-5),
    color: 'white',
    fontWeight: 'bold'
  },
  iqTestFooterView: {
    position: 'absolute',
    alignItems: 'center',
    bottom: scale(30),
    left: scale(80),
    flexDirection: 'row'
  },
  modalViewContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalViewContainer2: {
    height: scale(230),
    backgroundColor: 'white',
    opacity: 1,
    width: scale(200),
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: scale(10)
  },
  closeModal: {
    position: 'absolute',
    right: 10,

  },
  okCancelView: {
    flexDirection: 'row',
    paddingHorizontal: scale(40),
    paddingVertical: scale(30),
    justifyContent: 'center',
    alignItems: 'center'
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
  headerView: {
    flexDirection: 'row',
    marginBottom: scale(20),
    backgroundColor: '#61abea',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(10)
  },
});
