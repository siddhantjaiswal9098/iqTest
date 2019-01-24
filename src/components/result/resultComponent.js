import React, { Component } from 'react';
import {
  Dimensions, Alert, StyleSheet, Modal, FlatList, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/AntDesign';
import IconDelete from 'react-native-vector-icons/MaterialCommunityIcons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { AdMobBanner } from 'react-native-admob';
import * as Actions from '../../actions/commonAction';
import HeaderComponent from '../header/headerComponent';
import scale from '../../utils/scale';
import FinRealmService from '../../realm/realm';

const _frealm = new FinRealmService();
const youtubeIcon2 = (<Icon name="youtube" size={scale(30)} color="red" />);


const moment = require('moment');


const { height, width } = Dimensions.get('window');

class Result extends Component {
  constructor(props) {
    super(props);
    this.scroll = null;
    this.state = {
      dataForTestResult: this.props.navigation.state.params.dataForTestResult,
      id: this.props.navigation.state.params.id,
      modalDelete: false,
      daleteQnique: ''
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
        <View style={{ padding: scale(10), alignItems: 'center' }}>
          <Text style={{ fontSize: scale(22), }}>
            {`Total Attempts: ${this.state.dataForTestResult.length}`}
          </Text>
        </View>
        <FlatList
          data={this.state.dataForTestResult}
          renderItem={({ item }) => this._renderRow(item)}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={{ width, alignItems: 'center' }}>
          <AdMobBanner
            adSize="fullBanner"
            // adUnitID="ca-app-pub-1997214269651620/5618598933"
            adUnitID="ca-app-pub-3940256099942544/6300978111"
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.error('Error while Loading the Ads', error)}
          />
        </View>
        { this.state.modalDelete
          ? (
            <Modal
              animationType="fade"
              transparent
              visible={this.state.modalDelete}
            >
              <View style={styles.modalContainer}>
                <View style={styles.cancelBtnView}>
                  <TouchableOpacity style={styles.modalBtnText} onPress={() => this.setState({ modalDelete: !this.state.modalDelete })}>
                    <Text>
                      x
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ paddingHorizontal: scale(20), fontSize: scale(15) }}>
                    You won't be able to retrieve this data again. Do you really want to delete the history?
                  </Text>
                  <View style={styles.okCancelView}>
                    <TouchableOpacity
                      onPress={() => this.setState({ modalDelete: !this.state.modalDelete })}
                      style={{
                        padding: scale(10), paddingHorizontal: scale(2), backgroundColor: this.props.appColor, width: scale(80), justifyContent: 'center', alignItems: 'center', marginRight: scale(10)
                      }}
                    >
                      <Text style={{ color: 'white', fontSize: scale(15) }}>
                                                Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.deleteRes()}
                      style={{
                        padding: scale(10), paddingHorizontal: scale(2), backgroundColor: 'red', width: scale(80), justifyContent: 'center', alignItems: 'center'
                      }}
                    >
                      <Text style={{ color: 'white', fontSize: scale(15) }}>
                                                Ok
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          ) : null }
      </SafeAreaView>

    );
  }

  async deleteRes() {
    console.log('this is result page', this.state.id, this.props.data.id);
    const idObj = {
      testId: this.state.daleteQnique,
      UserId: this.props.data.id
    };
    this.props.apiCallForResultDeleteByID(idObj);
    // const dataFrom = await _frealm.realmGetAllData(this.state.id);
    this.setState({ modalDelete: !this.state.modalDelete });
    this.props.navigation.navigate('Home');
    // setTimeout(() => {
    // this.setState({ dataForTestResult: dataFrom });
    // this.setState({ dataForTestResult: dataFrom });
    // }, 3000);
  }

  itemClicked(item) {
    this.props.navigation.navigate('Certificate', { percentage: item.percentage });
  }

  _renderRow(item) {
    console.log('At result Page', item);
    const currentTime = item.date.toISOString();
    const datenew = moment(currentTime).format('DD-MM-YY hh:mm A');
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={item.percentage >= 50 ? () => this.itemClicked(item) : () => Alert.alert('Certificate can not be generated because you have failed the Test.')}
        style={{
          marginVertical: 3,
          height: scale(50),
          justifyContent: 'space-between',
          borderColor: 'black',
          opacity: 0.8,
          borderBottomWidth: scale(0.4),
          flexDirection: 'row',
          alignItems: 'center',
          padding: scale(15),
          marginHorizontal: scale(10),
          backgroundColor: 'white',
          flex: 1
        }}
      >
        <Text style={{ width: scale(70), fontSize: scale(20) }}>
          {`${item.percentage}%`}
        </Text>
        <Text style={{ color: item.percentage >= 50 ? 'green' : 'red', width: scale(50), fontSize: scale(20) }}>
          {item.percentage >= 50 ? 'PASS' : 'FAIL'}
        </Text>
        <Text style={{ fontSize: scale(15) }}>
          {datenew}
        </Text>
        <TouchableOpacity onPress={() => this.daleteTestResult(item.TestUniqueId)} style={{}}>
          <IconDelete name="delete-forever" size={scale(25)} color={this.props.appColor} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  daleteTestResult(item) {
    this.setState({ modalDelete: true, daleteQnique: item });
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
    marginLeft: scale(10),
    width: width - scale(20),
    fontSize: scale(15),
    color: 'grey',
    alignSelf: 'flex-start'
  },
  description: {
    marginTop: scale(20),
    borderColor: 'rgb(117, 117, 117)',
    borderWidth: scale(1),
    borderRadius: scale(4),
    height: scale(150),
    fontSize: scale(12),
    // fontFamily: 'ubuntu',
    paddingHorizontal: scale(5),
    textAlignVertical: 'top',
  },
  takeAnotherTestText: {
    position: 'absolute',
    right: scale(10),
    top: getStatusBarHeight(true),
    padding: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelBtnView: {
    height: scale(170),
    backgroundColor: 'white',
    opacity: 1,
    width: scale(250),
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: scale(10)
  },
  modalBtnText: {
    alignItems: 'flex-end',
    marginRight: scale(10),
    marginTop: scale(5),
    fontSize: scale(20)
  },
  okCancelView: {
    flexDirection: 'row',
    paddingHorizontal: scale(40),
    paddingVertical: scale(30),
    justifyContent: 'center',
    alignItems: 'center'
  }
});
