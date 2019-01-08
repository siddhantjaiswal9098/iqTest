import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const SIZE = {
  WIDTH: 375,
  HEIGHT: 667,
};

export default function (units = 1) {
  return width / SIZE.WIDTH * units;
}


const verticalScale = size => height / SIZE.HEIGHT * size;

export { verticalScale };
