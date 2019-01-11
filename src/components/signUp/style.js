import { StyleSheet } from 'react-native';
import scale from '../../utils/scale';


module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#61abea',

  },
  registration: {
    fontSize: scale(23),
    marginBottom: scale(20),
    marginTop: scale(20)
  },
  ImageContainer: {
    borderRadius: scale(80),
    width: scale(160),
    height: scale(160),
    borderColor: '#00F1B8',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DFEAE5',
    borderWidth: scale(12),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: scale(12),
  },
  inputfield: {
    height: scale(45),
    width: scale(200),
    borderBottomColor: 'gray',
    borderBottomWidth: 1,

  },
  signinbtn: {
    marginTop: scale(30),

  },
  text1: {
    marginTop: scale(30),
  },
  inlineView: {
    flexDirection: 'row',
    marginTop: scale(8),
  },
  viewfont: {
    marginTop: scale(10),
    marginRight: scale(4),
  },
  radiobtnview: {
    flexDirection: 'row',
    marginTop: scale(20),
  },
  LinearGradientstyle: {
    padding: scale(15),
    alignItems: 'center',
    paddingLeft: scale(80),
    paddingRight: scale(80),
    marginTop: scale(40),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: scale(8),
  },
  imgPlus: {
    position: 'absolute',
    top: scale(105),
    left: scale(105),
    backgroundColor: '#00F1B8',
    borderRadius: scale(100),
    padding: 1,

  },
  imageBackground: {
    height: scale(200),
    width: scale(200),
    marginTop: scale(30),
    borderRadius: scale(100),
    alignSelf: 'center',
  },
  createAccount: {
    marginTop: scale(20),
    backgroundColor: 'white',
    padding: scale(10)
  }
});
