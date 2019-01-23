import React, { PureComponent } from 'react';
import {
  StyleSheet, StatusBar, View, Dimensions, Text, TouchableOpacity,
} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { Finger } from './renderers';
import { MoveFinger } from './systems';
import HeaderComponent from '../header/headerComponent';
import scale from '../../utils/scale';

const { height, width } = Dimensions.get('window');
export default class gameComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.counter = 120;
    this.timer = setInterval(() => this.setState({ textTimer: this.counter-- }), 1000);
    this.state = {
      game: true,
      textTimer: 120,
      shouldRenderGame: true,
      RenderLost: true
    };
  }

  componentWillMount() {
    // Alert.alert('Move all the Circle inside the Big Circle.');
    const min = 10;
    const minH = 10;
    const max = width - 80;
    const maxH = height - 140;
    const randomWidth = Math.floor(Math.random() * (+max - +min)) + +min;
    const randomHeight = Math.floor(Math.random() * (+maxH - +minH)) + +minH;
    this.setState({ randomWidth, randomHeight });
  }

  timeFormatter(timeInSeconds) {
    const d = Number(timeInSeconds);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);
    const hDisplay = h > 0 ? `${h}:` : '';
    const mDisplay = m > 0 ? `${m}:` : '00:';
    const sDisplay = s >= 0 ? (s < 10 ? `0${s}` : s) : '';

    return (hDisplay + mDisplay + sDisplay);
  }

  timeExpiredNavigate() {
    clearInterval(this.timer);
    this.setState({ RenderLost: false });
  }

  methodCall() {
    this.setState({ shouldRenderGame: false });
    clearInterval(this.timer);
  }

  newGameClicked() {
    this.setState({ shouldRenderGame: true, RenderLost: true });
    this.counter = 120;
    this.timer = setInterval(() => this.setState({ textTimer: this.counter-- }), 1000);
  }

  render() {
    console.log('this.state', this.state.randomHeight, this.state.randomWidth);
    if (this.counter < 0) {
      this.timeExpiredNavigate();
    }
    if (this.state.RenderLost) {
      if (this.state.shouldRenderGame) {
        return (
          // <ImageBackground source={require('./../../assets/gamebackground2.jpg')} style={{ width: '100%', height: '100%' }}>
          <GameEngine
            style={styles.container}
            systems={[MoveFinger]}
            entities={{
              0: { position: [40, 200], renderer: <Finger randomHeight={this.state.randomHeight + scale(40)} randomWidth={this.state.randomWidth} keys={0} methodCall={() => this.methodCall()} /> },
              1: { position: [100, 200], renderer: <Finger randomHeight={this.state.randomHeight + scale(40)} randomWidth={this.state.randomWidth} keys={1} methodCall={() => this.methodCall()} /> },
              2: { position: [160, 200], renderer: <Finger randomHeight={this.state.randomHeight + scale(40)} randomWidth={this.state.randomWidth} keys={2} methodCall={() => this.methodCall()} /> },
              3: { position: [220, 200], renderer: <Finger randomHeight={this.state.randomHeight + scale(40)} randomWidth={this.state.randomWidth} keys={3} methodCall={() => this.methodCall()} /> },
              4: { position: [280, 200], renderer: <Finger randomHeight={this.state.randomHeight + scale(40)} randomWidth={this.state.randomWidth} keys={4} methodCall={() => this.methodCall()} /> }
            }}
          >
            <HeaderComponent navigationFromPage={this.props.navigation} headerText="Game" />
            <Text style={styles.NoteText}>
              Move all the Circle inside the Big Circle.
            </Text>
            <Text style={[styles.TextTimer, { color: this.counter < 60 ? 'red' : 'white' }]}>
              {this.timeFormatter(this.state.textTimer)}
            </Text>
            <StatusBar hidden />
            <View style={[styles.circle, { marginLeft: this.state.randomWidth, marginTop: this.state.randomHeight }]} />
          </GameEngine>
          // </ImageBackground>
        );
      } else {
        return (
          <View style={{ backgroundColor: '#fdf5e6', flex: 1 }}>
            <HeaderComponent navigationFromPage={this.props.navigation} headerText="Game" />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Congratulation you have Won..!!</Text>
              <Text>
You have completed the game in
                {' '}
                {this.timeFormatter(this.counter)}
              </Text>
              <TouchableOpacity style={{ padding: 10, backgroundColor: 'gray', marginTop: 10 }} onPress={() => this.newGameClicked()}>
                <Text>
                PLAY ANOTHER
                </Text>
                <StatusBar hidden />
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    } else {
      return (
        <View style={{ backgroundColor: '#fdf5e6', flex: 1 }}>
          <HeaderComponent navigationFromPage={this.props.navigation} headerText="Game" />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>TimeOut..!!</Text>
            <Text>you have Lost the Game</Text>
            <TouchableOpacity style={{ padding: 10, backgroundColor: 'gray', marginTop: 10 }} onPress={() => this.newGameClicked()}>
              <Text>
              TRY AGAIN
              </Text>
              <StatusBar hidden />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf5e6'
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'black'
  },
  TextTimer: {
    fontWeight: 'bold',
    fontSize: scale(20),
    color: 'white',
    position: 'absolute',
    top: scale(5),
    right: scale(10),
  },
  NoteText: {
    position: 'absolute',
    top: scale(90),
    left: scale(20),
    fontWeight: 'bold',
    fontSize: scale(18)
  }
});
