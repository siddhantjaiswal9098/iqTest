import React, { Component } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BackIcon from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as Actions from '../../actions/commonAction';
import scale from '../../utils/scale';

const BackIcon2 = (<BackIcon name="md-arrow-back" size={scale(30)} color="#fff" />);

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={[styles.headerView, { backgroundColor: this.props.appColor }]}>
        <Text style={styles.headerText}>{this.props.headerText}</Text>
        <TouchableOpacity onPress={() => this.props.navigationFromPage.goBack()} style={styles.backBtnChat}>
          {BackIcon2}
          <Text />
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
  const { ReducerSettings } = state;
  return {
    data: ReducerSignup.data,
    appColor: ReducerSettings.appColor
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);


const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    // marginBottom: scale(20),
    backgroundColor: '#61abea',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(10),
    height: scale(40),
  },
  headerText: {
    fontSize: scale(28),
    color: 'white',
    fontWeight: 'bold',
  },
  backBtnChat: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    left: scale(10),
    position: 'absolute',
    padding: scale(10),
    marginTop: getStatusBarHeight(true)
  },
});
