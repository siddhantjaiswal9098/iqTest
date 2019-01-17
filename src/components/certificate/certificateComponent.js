import React, { Component } from 'react';
import {
  SafeAreaView, BackHandler, Text, View, TouchableOpacity, Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions, StackActions } from 'react-navigation';
import ViewShot from 'react-native-view-shot';
import PinchZoomView from 'react-native-pinch-zoom-view';

import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/Entypo';
import HomeIcon from 'react-native-vector-icons/FontAwesome5';
import scale from '../../utils/scale';
import * as Actions from '../../actions/commonAction';
import styles from './styles';

const RNFS = require('react-native-fs');

const Icon2 = (<Icon name="share" size={scale(30)} color="#000" />);
const HomeIcon2 = (<HomeIcon name="home" size={scale(30)} color="#000" />);

class Certificate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: this.props.navigation.state.params.percentage,
      visible: false,
      uriData: '',
      name: `${this.props.data.name} ${this.props.data.lname}`,
    };
  }

    handleBackPress = () => {
      console.log('Blocked BackButtton');
      return true;
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentDidMount() {
      console.log('Done with it99', this.props.TestResult);
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      setTimeout(() => {
        this.refs.viewShot.capture().then((uri) => {
          console.log('do something with didmount', uri);
          this.setState({ uriData: uri });
        }).catch((err) => {
          console.log('Error while Certificate generation', err);
        });
      }, 100);
    }

    onCancel() {
      this.setState({ visible: false });
    }

    onOpen() {
      this.setState({ visible: true });
    }

    clickSend() {
      RNFS.readFile(this.state.uriData, 'base64').then((image) => {
        Share.open({
          title: 'Yeah...!!!',
          message: 'I have completed a iqTest',
          url: `data:image/jpeg;base64,${image}`,
          type: 'image/jpeg',
          subject: 'iqTest'
        }).catch((err) => {
          console.log('ERROR', err);
        });
      });
    }

    clickHome() {
      const { navigation } = this.props;
      const toRoute = 'Home';
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: toRoute })
        ]
      });
      navigation.dispatch(resetAction);
    }

    render() {
      // console.log("URI:-", this.state.uriData);
      return (
        <SafeAreaView style={styles.container}>
          <PinchZoomView style={styles.pinchZoomView}>
            <ViewShot ref="viewShot" options={{ format: 'jpg', quality: 0.9 }}>

              <Text style={styles.nameView}>
                {this.state.name}

              </Text>
              <Text style={styles.percentageView}>
                {this.state.percentage}

              </Text>
              <Image style={styles.imageView} source={require('./../../assets/certificate.png')} />

            </ViewShot>
          </PinchZoomView>
          <TouchableOpacity style={styles.sendBtnView} onPress={() => { this.clickSend(); }}>
            <View style={styles.shareIconView}>
              {Icon2}
              <Text style={{ fontSize: scale(16) }}>Share</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backToHomeView} onPress={() => { this.clickHome(); }}>
            <View style={styles.backToHomeInnerView}>
              {HomeIcon2}
              <Text style={{ fontSize: scale(16) }}>  Back to Home</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}
function mapStateToProps(state) {
  const { ReducerSignup } = state;
  const { ReducerResult } = state;
  return {
    data: ReducerSignup.data,
    TestResult: ReducerResult.TestResult
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Certificate);

