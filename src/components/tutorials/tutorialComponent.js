import React, { Component } from 'react';
import {
  Dimensions, ActivityIndicator, StyleSheet, WebView, SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/commonAction';
import HeaderComponent from '../header/headerComponent';
import scale from '../../utils/scale';

const { height, width } = Dimensions.get('window');
const textMax = 300;
class Feedback extends Component {
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
    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent navigationFromPage={this.props.navigation} headerText="Tutorial" />
        <WebView
          source={{ uri: 'https://www.youtube.com/watch?v=tnc9ojITRg4&list=PLpyc33gOcbVA4qXMoQ5vmhefTruk5t9lt' }}
          onLoad={() => this.hideSpinner()}
        />
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
