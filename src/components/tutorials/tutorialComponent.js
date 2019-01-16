import React, { Component } from 'react';
import {
  Dimensions, Animated, BackHandler, ActivityIndicator, StyleSheet, WebView, SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toast, {DURATION} from 'react-native-easy-toast';
import * as Actions from '../../actions/commonAction';
import HeaderComponent from '../header/headerComponent';
import scale from '../../utils/scale';

const { height, width } = Dimensions.get('window');
const textMax = 300;
class Feedback extends Component {
  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(100);
    this.state = {
      feedback: '',
      remaining: textMax,
      avatarSource: null,
      visible: true
    };
  }

  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.refs.toast.show('Press again to Exit tutorial');
    this.state.backClickCount === 1 ? this.props.navigation.goBack() : this._spring();

    return true;
  }

  _spring() {
    this.setState({ backClickCount: 1 }, () => {
      Animated.sequence([
        Animated.spring(
          this.springValue,
          {
            toValue: -0.15 * height,
            friction: 5,
            duration: 300,
            useNativeDriver: true,
          }
        ),
        Animated.timing(
          this.springValue,
          {
            toValue: 100,
            duration: 300,
            useNativeDriver: true,
          }
        ),

      ]).start(() => {
        this.setState({ backClickCount: 0 });
      });
    });
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent navigationFromPage={this.props.navigation} headerText="Tutorial" />
        <WebView
          source={{ uri: 'https://www.youtube.com/watch?v=tnc9ojITRg4&list=PLpyc33gOcbVA4qXMoQ5vmhefTruk5t9lt' }}
          onLoad={() => this.hideSpinner()}
        />
        <Toast ref="toast" />
        {this.state.visible && (
          <ActivityIndicator
            style={{ position: 'absolute', top: height / 2 - scale(60), left: width / 2 - scale(20) }}
            size="large"
          />
        )}
      </SafeAreaView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}
function mapStateToProps(state) {
  const { ReducerSignup } = state;
  const { ReducerSettings } = state;
  return {
    data: ReducerSignup.data,
    appColor: ReducerSettings.appColor
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
