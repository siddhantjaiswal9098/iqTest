import React, { Component } from 'react';
import {
  SafeAreaView, ImageBackground, Text, View, Animated, Easing, Image,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import * as Actions from '../../actions/commonAction';
import styles from './style';
// import { NavigationActions, StackActions } from 'react-navigation';
import scale from '../../utils/scale';


class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.animatedValue2 = new Animated.Value(0);
    this.state = {
    };
  }

  componentDidMount() {
    this.animate();
    this.animate2();

    setTimeout(() => {
      // console.log("Props",this.props.data);
      let toRoute = 'Signup';
      if (this.props.data.length !== 0) {
        toRoute = 'Home';
      }
      // console.log('^^^^^^^',this.props.data);
      const { navigation } = this.props;

      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: toRoute })
        ]
      });
      navigation.dispatch(resetAction);
      //  this.props.navigation.navigate('Signup')
    }, 3000);
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start();
  }

  animate2() {
    this.animatedValue2.setValue(0);
    Animated.timing(
      this.animatedValue2,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start();
  }

  render() {
    const top = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [scale(1000), 0]
    });
    const bottom = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [scale(1000), 0]
    });
    const rotateX = this.animatedValue2.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '180deg', '0deg']
    });
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('./../../assets/background.jpg')}
        />
        <View style={styles.container}>


          <Animated.View
            style={{
              transform: [{ rotateX }],
              position: 'absolute',
              top: scale(170),
            }}
          >
            <Image
              style={styles.LogoImage}
              source={require('./../../assets/logo.jpg')}
            />
          </Animated.View>
          <View style={{ flexDirection: 'row' }}>

            <Animated.View
              style={{
                marginBottom: top,
              }}
            >
              <Text style={styles.IqData}>iq</Text>
            </Animated.View>
            <Animated.View
              style={{
                marginTop: bottom,
              }}
            >
              <Text style={styles.TestData}>Test</Text>
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}
function mapStateToProps(state) {
  const { ReducerSignup } = state;
  return {
    data: ReducerSignup.data

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
