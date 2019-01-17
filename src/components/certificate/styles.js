
import { StyleSheet, Dimensions } from 'react-native';
import scale from '../../utils/scale';

const { height } = Dimensions.get('window');
module.exports = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',

  },
  pinchZoomView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameView: {
    position: 'absolute',
    top: scale(80),
    left: scale(170),
    zIndex: 5000,
    fontSize: scale(9)
  },
  percentageView: {
    position: 'absolute',
    top: scale(151),
    left: scale(110),
    zIndex: 5,
    fontSize: scale(8)
  },
  imageView: {
    width: scale(761 / 2),
    height: scale(538 / 2),
  },
  sendBtnView: {
    position: 'absolute',
    right: 10,
    bottom: scale(10),
    zIndex: 5000,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  shareIconView: {
    backgroundColor: '#cccccc',
    margin: scale(10),
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10
  },
  backToHomeView: {
    position: 'absolute',
    left: 10,
    bottom: scale(10),
    zIndex: 5000,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backToHomeInnerView: {
    backgroundColor: '#cccccc',
    margin: scale(10),
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10
  },
});

