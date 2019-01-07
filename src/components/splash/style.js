import {
  StyleSheet, PixelRatio, Dimensions
} from 'react-native';
import scale from '../../utils/scale';

const { height, width } = Dimensions.get('window');

module.exports = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  registration: {
    marginTop: scale(30),
    fontSize: scale(23),
    marginBottom: scale(30),
  },
  ImageContainer: {
    borderRadius: scale(80),
    width: scale(160),
    height: scale(160),
    backgroundColor: '#00F1B8',
    borderColor: '#00F1B8',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DFEAE5',
    borderWidth: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 12,

  },
  inputfield: {
    height: scale(45),
    width: scale(200),
    borderBottomColor: 'gray',
    borderBottomWidth: 1,

  },
  createAccount: {
    padding: scale(20),
    paddingLeft: scale(100),
    paddingRight: scale(100),
    marginTop: scale(40),
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    color: 'white',
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
    shadowRadius: 8,
  },
  imgPlus: {
    position: 'absolute',
    top: scale(105),
    left: scale(105),
    backgroundColor: '#00F1B8',
    borderRadius: scale(100),
    padding: 1,

  },
  backgroundImage: {
    height,
    width,
    position: 'absolute',
    borderRadius: scale(100)
  },
  LogoImage: {
    width: scale(200),
    height: scale(200),
    borderRadius: scale(100)
  },
  IqData: {
    fontSize: scale(30),
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: '#585858',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  TestData: {
    fontWeight: 'bold',
    fontSize: scale(30),
    color: 'white',
    textShadowColor: '#585858',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  }
});
