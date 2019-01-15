import React, { Component } from 'react';
import {
  Dimensions, StyleSheet, WebView, ActivityIndicator, View, SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderComponent from '../header/headerComponent';
import * as Actions from '../../actions/commonAction';
import scale from '../../utils/scale';

const { height, width } = Dimensions.get('window');
const textMax = 300;

class HelpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      remaining: textMax,
      avatarSource: null,
      visible: true
    };
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  render() {
    let URI = '';
    // eslint-disable-next-line no-undef
    if (!__DEV__) {
      // code condition for IOS release if needed in future.
      URI = { uri: 'file:///android_asset/html/Help.html' };
    } else {
      URI = require('./Help.html');
    }
    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent navigationFromPage={this.props.navigation} headerText="iqTest" />
        <WebView
          source={URI}
          style={{ marginBottom: 20 }}
          onLoad={() => this.hideSpinner()}
        />
        {this.state.visible && (
        <View style={{
          height, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.2)', width
        }}
        >
          <ActivityIndicator
            style={{ position: 'absolute', top: height / 2 - scale(60), left: width / 2 - scale(20) }}
            size="large"
          />
        </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(HelpComponent);


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
});
