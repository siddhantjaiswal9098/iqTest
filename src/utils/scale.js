import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
const SIZE = {
	WIDTH: 375,
	HEIGHT: 667,
};;

/**
 * Function to scale a value based on the size of the screen size and the original
 * size used on the design.
 */
// export default function (units = 1) {
// 	if (height > width)
// 		return ((units) * height) / SIZE.HEIGHT;
// 	else
// 		return ((units) * width) / SIZE.HEIGHT;

// }
export default function (units = 1) {
	return width / SIZE.WIDTH * units;
}


const verticalScale = size => height / SIZE.HEIGHT * size;

export { verticalScale };
