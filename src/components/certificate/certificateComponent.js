import React, { Component } from 'react';
import {
  SafeAreaView, StyleSheet, BackHandler, Text, View, TouchableOpacity, Image
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

const RNFS = require('react-native-fs');

const Icon2 = (<Icon name="share" size={30} color="#000" />);
const HomeIcon2 = (<HomeIcon name="home" size={30} color="#000" />);

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
      // console.log('Siddhant', this.props.navigation.state.params.percentage)

      //   const granted = await PermissionsAndroid.check(
      //     'android.permission.READ_EXTERNAL_STORAGE'
      //    );
      //    if (!granted) {
      //     const response = await PermissionsAndroid.request(
      //       'android.permission.READ_EXTERNAL_STORAGE'
      //     );
      //     if (!response) {
      //       return;
      //     }
      //    }
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
      // RNFS.DocumentDirectoryPath +
      RNFS.readFile(this.state.uriData, 'base64').then((image) => {
        Share.open({
          title: 'congratulations',
          message: 'congratulations on the completion of Test.',
          url: `data:image/jpeg;base64,${image}`,
          type: 'image/jpeg',
          subject: 'iqTest' //  for email
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
          <PinchZoomView style={{ alignItems: 'center', justifyContent: 'center' }}>
            <ViewShot ref="viewShot" options={{ format: 'jpg', quality: 0.9 }}>

              <Text style={{
                position: 'absolute', top: scale(80), left: scale(170), zIndex: 5000, fontSize: scale(9)
              }}
              >
                {this.state.name}

              </Text>
              <Text style={{
                position: 'absolute', top: scale(151), left: scale(110), zIndex: 5000, fontSize: scale(9)
              }}
              >
                {this.state.percentage}

              </Text>
              <Image style={{ width: scale(761 / 2), height: scale(538 / 2), }} source={require('./../../assets/certificate.png')} />

            </ViewShot>
          </PinchZoomView>
          {/* <Image style={{ height: 200, width: 200 }} source={{ uri: this.state.uriData }} /> */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 10,
              bottom: scale(10),
              zIndex: 5000,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            onPress={() => {
              this.clickSend();
            }}
          >
            <View style={{
              backgroundColor: '#cccccc',
              margin: scale(10),
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10
            }}
            >
              {Icon2}
              <Text>  Share</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 10,
              bottom: scale(10),
              zIndex: 5000,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            onPress={() => {
              this.clickHome();
            }}
          >
            <View style={{
              backgroundColor: '#cccccc',
              margin: scale(10),
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10
            }}
            >
              {HomeIcon2}
              <Text>  Back to Home</Text>
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


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',

  },

});
