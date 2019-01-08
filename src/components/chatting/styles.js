
import { StyleSheet, Dimensions } from 'react-native';
import scale from '../../utils/scale';

const { height } = Dimensions.get('window');
module.exports = StyleSheet.create({

  container: {
    flex: 1,
  },
  ImageBackground: {
    position: 'absolute',
    height: scale(200),
    width: scale(200),
    borderRadius: scale(100),
    alignSelf: 'center',
    top: height / 2 - scale(100)
  },
  headerView: {
    flexDirection: 'row',
    marginBottom: scale(20),
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
  headerLogout: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    right: scale(10),
    position: 'absolute'
  },
  MenuBtnHome: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    left: scale(10),
    position: 'absolute'
  },
  backBtnChat: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    left: scale(40),
    position: 'absolute'
  },
  feedbackIcon: {
    height: scale(70),
    width: scale(70),
  },
  modalViewContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalViewContainer2: {
    height: scale(150),
    backgroundColor: 'white',
    opacity: 1,
    width: scale(200),
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: scale(10)
  },
  closeModal: {
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
  }
});
