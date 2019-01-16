import React, { Component } from 'react';
import {
  Dimensions, Alert, StyleSheet, FlatList, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { AdMobBanner } from 'react-native-admob';
import * as Actions from '../../actions/commonAction';
import HeaderComponent from '../header/headerComponent';
import scale from '../../utils/scale';

const youtubeIcon2 = (<Icon name="youtube" size={scale(30)} color="red" />);
const moment = require('moment');


const { height, width } = Dimensions.get('window');

class Result extends Component {
  constructor(props) {
    super(props);
    this.scroll = null;
    this.state = {
      dataForTestResult: this.props.navigation.state.params.dataForTestResult,
      id: this.props.navigation.state.params.id
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent navigationFromPage={this.props.navigation} headerText={`Test: ${this.state.id}`} />
        <TouchableOpacity style={styles.takeAnotherTestText} onPress={() => this.props.navigation.navigate('TutorialComponent')}>
          {youtubeIcon2}
        </TouchableOpacity>
        <Image
          style={{
            position: 'absolute',
            height: scale(200),
            width: scale(200),
            borderRadius: scale(100),
            alignSelf: 'center',
            top: height / 2 - scale(100)
          }}
          source={require('./../../assets/logo.jpg')}
        />
        <View style={{ padding: 10, alignSelf: 'center' }}>
          <Text style={{ fontSize: 22 }}>
            {`Total Attempts: ${this.state.dataForTestResult.length}`}
          </Text>
        </View>
        <FlatList
          data={this.state.dataForTestResult}
          renderItem={({ item }) => this._renderRow(item)}
          keyExtractor={(item, index) => index.toString()}
          // inverted
        />
        <AdMobBanner
          adSize="fullBanner"
          // adUnitID="ca-app-pub-1997214269651620/5618598933"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error('Error while Loading the Ads', error)}
        />
      </SafeAreaView>

    );
  }

  itemClicked(item) {
    this.props.navigation.navigate('Certificate', { percentage: item.percentage });
  }
  
  _renderRow(item) {
    // console.log('At result Page', item);
    const currentTime = item.date.toISOString();
    const datenew = moment(currentTime).format('DD-MM-YY hh:mm A');
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={item.percentage >= 50 ? () => this.itemClicked(item) : () => Alert.alert('Certificate can not be generated because you have failed the Test.')}
        style={{
          marginVertical: 3, height: 50, justifyContent: 'space-between', borderColor: 'black', opacity: 0.8, borderBottomWidth: 0.4, flexDirection: 'row', alignItems: 'center', padding: 15, marginHorizontal: 10, backgroundColor: 'white', flex: 1
        }}
      >
        <Text style={{ width: 70, fontSize: 20 }}>
          {`${item.percentage}%`}
        </Text>
        <Text style={{ color: item.percentage >= 50 ? 'green' : 'red', width: 50, fontSize: 20 }}>
          {item.percentage >= 50 ? 'PASS' : 'FAIL'}
        </Text>
        <Text>
          {datenew}
        </Text>
      </TouchableOpacity>
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
export default connect(mapStateToProps, mapDispatchToProps)(Result);


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  tagLineText: {
    marginLeft: 10,
    width: width - 20,
    fontSize: 15,
    color: 'grey',
    alignSelf: 'flex-start'
  },
  description: {
    marginTop: 20,
    borderColor: 'rgb(117, 117, 117)',
    borderWidth: 1,
    borderRadius: 4,
    height: 150,
    fontSize: 12,
    // fontFamily: 'ubuntu',
    paddingHorizontal: 5,
    textAlignVertical: 'top',
  },
  takeAnotherTestText: {
    position: 'absolute',
    right: 10,
    top: getStatusBarHeight(true) + scale(10),
    padding: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
