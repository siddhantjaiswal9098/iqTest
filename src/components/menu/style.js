/* eslint-disable no-undef */
import { StyleSheet } from 'react-native';
import scale from '../../utils/scale';


module.exports = StyleSheet.create({
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
    width: scale(200),
    alignItems: 'center',
  },
  avatar: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(24),
  },
  name: {
    color: 'white',
    fontSize: scale(16),
  },
  email: {
    color: 'white',
    fontSize: scale(17)
  },
  item: {
    color: 'white',
    fontSize: scale(20),
    fontWeight: 'bold',
    paddingTop: scale(5),
    marginLeft: 5
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
  }
});
