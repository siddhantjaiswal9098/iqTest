import React, { PureComponent } from 'react';
import {
  StyleSheet, Image
} from 'react-native';

let fingure1 = false;
let fingure2 = false;
let fingure3 = false;
let fingure4 = false;
let fingure5 = false;


const RADIUS = 20;
const textMax = 300;
class Finger extends PureComponent {
  constructor(props) {
    super(props);
    this.firstWon = true;
    this.state = {
      feedback: '',
      remaining: textMax,
      avatarSource: null,
    };
    // this.fingure1 = false;
    // this.fingure2 = false;
    // this.fingure3 = false;
    // this.fingure4 = false;
    // this.fingure5 = false;
  }

  render() {
    const x = this.props.position[0] - RADIUS / 2;
    const y = this.props.position[1] - RADIUS / 2;
    console.log('Jadu ki value', y, this.props.renderer.props.randomHeight, this.props.renderer.props.randomWidth, x);
    const a = this.props.renderer.props.randomHeight;
    const b = this.props.renderer.props.randomWidth;
    const keyVal = this.props.renderer.props.keys;
    // console.log('Donedanadone', keyVal);

    if (keyVal === 0) {
      if ((y - a) < 25 && (y - a) > 0 && (x - b) < 25 && (x - b) > 0) {
        fingure1 = true;
        console.log('Done0');
      } else {
        fingure1 = false;
        console.log('Done0false');
      }
    }
    if (keyVal === 1) {
      if ((y - a) < 25 && (y - a) > 0 && (x - b) < 25 && (x - b) > 0) {
        fingure2 = true;
        console.log('Done1');
      } else {
        fingure2 = false;
      }
    }
    if (keyVal === 2) {
      if ((y - a) < 25 && (y - a) > 0 && (x - b) < 25 && (x - b) > 0) {
        fingure3 = true;
        console.log('Done2');
      } else {
        fingure3 = false;
      }
    }
    if (keyVal === 3) {
      if ((y - a) < 25 && (y - a) > 0 && (x - b) < 25 && (x - b) > 0) {
        fingure4 = true;
        console.log('Done3');
      } else {
        fingure4 = false;
      }
    }
    if (keyVal === 4) {
      if ((y - a) < 25 && (y - a) > 0 && (x - b) < 25 && (x - b) > 0) {
        fingure5 = true;
        console.log('Done4');
      } else {
        fingure5 = false;
      }
    }
    console.log('DoneAll', fingure1, fingure2, fingure3, fingure4, fingure5);
    if (fingure1 && fingure2 && fingure3 && fingure4 && fingure5 && this.firstWon) {
      this.firstWon = false;
      this.props.renderer.props.methodCall();
      // Alert.alert('You have won asfafasfthe Game!!!!!!!!');
    }
    return (
      // <View style={[styles.finger, { left: x, top: y }]} />
      <Image
        style={[styles.finger, { left: x, top: y }]}
        source={require('./../../assets/logo.jpg')}
      />
    );
  }
}
// const styles = StyleSheet.create({
//   finger: {
//     borderColor: '#CCC',
//     borderWidth: 4,
//     borderRadius: RADIUS * 2,
//     width: RADIUS * 2,
//     height: RADIUS * 2,
//     backgroundColor: 'pink',
//     position: 'absolute',
//   }
// });
const styles = StyleSheet.create({
  finger: {
    // borderColor: '#CCC',
    // borderWidth: 4,
    borderRadius: RADIUS,
    width: RADIUS * 2,
    height: RADIUS * 2,
    backgroundColor: 'pink',
    position: 'absolute',
  }
});

export { Finger };
