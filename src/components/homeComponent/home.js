import React, { Component } from 'react';
import {
  Text, View, SafeAreaView, FlatList, BackHandler, Modal, Dimensions, TouchableOpacity, Image, Animated, Easing
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconRightAns from 'react-native-vector-icons/AntDesign';
import IconMenu from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions, StackActions } from 'react-navigation';
import FeedbackIcon from 'react-native-vector-icons/MaterialIcons';
import GridView from 'react-native-super-grid';
import * as Animatable from 'react-native-animatable';
import scale from '../../utils/scale';
import * as Actions from '../../actions/commonAction';
import styles from './style';
import FinRealmService from '../../realm/realm';

const _frealm = new FinRealmService();
const InfoIcon = (<IconMenu name="info-with-circle" size={scale(19)} color="red" />);
const RightAns = (<IconRightAns name="checkcircle" size={scale(17)} color="#3CB371" />);
const Icon2 = (<Icon name="power-off" size={scale(30)} color="#fff" />);
const IconMenu2 = (<IconMenu name="menu" size={scale(30)} color="#fff" />);
const GameIcon = (<IconMenu name="game-controller" size={scale(30)} color="#fff" />);
const FeedbackIcon2 = (<FeedbackIcon name="chat" size={scale(50)} color="#fff" />);
const { height, width } = Dimensions.get('window');
class Home extends Component {
    _didFocusSubscription;

    _willBlurSubscription;

    constructor(props) {
      super(props);
      this.animatedValue = new Animated.Value(0);
      this.animatedValue2 = new Animated.Value(0);
      this.state = {
        dataForListTest: this.props.AllTestDetail,
        ModalClose: false,
        exitModal: false,
        TestResult: this.props.TestResult
      };
    }

    animate() {
      this.animatedValue.setValue(0);
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 100,
          easing: Easing.linear
        }
      ).start(() => this.animate());
    }

    animate2() {
      this.animatedValue2.setValue(0);
      Animated.timing(
        this.animatedValue2,
        {
          toValue: 1,
          duration: 100,
          easing: Easing.linear
        }
      ).start();
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.navigateToChat === true) {
        this.props.navigateToChatting(nextProps.navigateScreen);
        this.props.closeMenu();
        this.props.navigation.navigate(nextProps.navigateScreen);
      }
      // console.log('this.props.AllTestDetail', this.props.AllTestDetail);
      // console.log('nextProps.AllTestDetail', nextProps.AllTestDetail);

      if (this.props.AllTestDetail !== nextProps.AllTestDetail) {
        this.setState({ dataForListTest: nextProps.AllTestDetail });
      }
      if (nextProps.TestResult !== this.state.TestResult) {
        this.setState({ TestResult: nextProps.TestResult });
      }
      console.log('PROPSNEXT', nextProps.TestResult);
    }

    logOutClick() {
      const { navigation } = this.props;
      const toRoute = 'Signup';
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: toRoute })
        ]
      });
      navigation.dispatch(resetAction);
      this.setState({ ModalClose: false });
      _frealm.deleteAll();
      this.props.signOutClicked(this.props.data.id);
      this.props.signOutClickRemoveResult();
    }

    feedBackBtn() {
      this.props.navigation.navigate('Feedback');
    }

    componentDidMount() {
      this.animate();
      this._didFocusSubscription = this.props.navigation.addListener('didFocus', payload => BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)); this._didFocusSubscription = this.props.navigation.addListener('didFocus', payload => BackHandler.addEventListener('hardwareBackPress', this.handleBackPress));
      this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload => BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress));
      this.props.apiCallForDataAllResult(this.props.data.id);
    }

    componentWillMount() {
      this.props.ApiCallForAllTestAction();
    }

    handleBackPress = () => {
      this.setState({ exitModal: true });
      return true;
    }

    exitPress() {
      this.setState({ exitModal: false });
      BackHandler.exitApp();
    }

    render() {

      console.log('reducer data---->>>', this.props.data);
      // const height1 = this.animatedValue.interpolate({
      //   inputRange: [0, 0.5, 1],
      //   outputRange: [scale(0), scale(2), scale(0)]
      // });
      // const width1 = this.animatedValue.interpolate({
      //   inputRange: [0, 1],
      //   outputRange: [0, 50]
      // });
      // const rotateX = this.animatedValue.interpolate({
      //   inputRange: [0, 0.5, 1],
      //   outputRange: ['0deg', '180deg', '0deg']
      // });
      return (

        <SafeAreaView style={styles.container}>
          <Image
            style={styles.ImageBackground}
            source={require('./../../assets/logo.jpg')}
          />
          <View style={[styles.headerView, { backgroundColor: this.props.appColor }]}>
            <Text style={styles.headerText}>Home</Text>
            <TouchableOpacity onPress={() => this.props.toggleMenu()} style={styles.MenuBtnHome}>
              {IconMenu2}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.setState({ ModalClose: true }); }} style={styles.headerLogout}>
              {Icon2}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerLogout, { right: scale(50) }]} onPress={() => this.props.navigation.navigate('GameComponent')}>
              <Animated.View>
                {GameIcon}
              </Animated.View>
            </TouchableOpacity>
          </View>
          {/* <FlatList
            data={this.state.dataForListTest}
            renderItem={({ item }) => this._renderRow(item)
                    }
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          /> */}
          <GridView
            itemDimension={width / 2 - 30}
            items={this.state.dataForListTest}
            renderItem={item => this._renderRow(item)}
          />
          {
                    this.state.dataForListTest && this.state.dataForListTest.length === 0
                      ? (
                        <View style={{
                          fontSize: scale(17), position: 'absolute', top: height / 2, left: width / 2 - scale(100)
                        }}
                        >
                          <Text>Fetching Latest data please wait..</Text>

                        </View>
                      )
                      : <View />
                }
          <TouchableOpacity
            style={{
              backgroundColor: this.props.appColor, borderRadius: scale(35), padding: scale(5), position: 'absolute', right: scale(20), bottom: scale(30)
            }}
            onPress={() => this.feedBackBtn()}
          >
            <Animated.View style={{ marginTop: 5 }}>{FeedbackIcon2}</Animated.View>
          </TouchableOpacity>
          {
                    this.state.ModalClose
                      ? (
                        <Modal
                          animationType="fade"
                          transparent
                          visible={this.state.ModalClose}
                        >
                          <View style={styles.modalViewContainer}>
                            <View style={styles.modalViewContainer2}>
                              <TouchableOpacity style={styles.closeModal} onPress={() => this.setState({ ModalClose: false })}>
                                <Text>x</Text>
                              </TouchableOpacity>
                              <Text style={{ paddingHorizontal: scale(20), fontSize: scale(15) }}>Do you want logOut?</Text>
                              <View style={styles.okCancelView}>
                                <TouchableOpacity
                                  onPress={() => this.setState({ ModalClose: false })}
                                  style={{
                                    padding: scale(10), paddingHorizontal: scale(2), backgroundColor: this.props.appColor, width: scale(80), justifyContent: 'center', alignItems: 'center', marginRight: scale(10)
                                  }}
                                >
                                  <Text style={{ color: 'white', fontSize: scale(15) }}>
                                                Cancel
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => this.logOutClick()}
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
                      ) : <View />
                }
          {
                    this.state.exitModal
                      ? (
                        <Modal
                          animationType="fade"
                          transparent
                          visible={this.state.exitModal}
                        >
                          <View style={styles.modalViewContainer}>
                            <View style={styles.modalViewContainer2}>
                              <TouchableOpacity style={styles.closeModal} onPress={() => this.setState({ exitModal: false })}>
                                <Text>x</Text>
                              </TouchableOpacity>
                              <Text style={{ paddingHorizontal: 20, fontSize: scale(15) }}>Do you Really want to Exit?</Text>
                              <View style={styles.okCancelView}>
                                <TouchableOpacity
                                  onPress={() => this.setState({ exitModal: false })}
                                  style={{
                                    borderRadius: 10, padding: scale(10), paddingHorizontal: scale(2), backgroundColor: this.props.appColor, width: scale(80), justifyContent: 'center', alignItems: 'center', marginRight: scale(10)
                                  }}
                                >
                                  <Text style={{ color: 'white', fontSize: scale(15) }}>
                                                Cancel
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => this.exitPress()}
                                  style={{
                                    borderRadius: 10, padding: scale(10), paddingHorizontal: scale(2), backgroundColor: 'red', width: scale(80), justifyContent: 'center', alignItems: 'center'
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
                      ) : <View />
                }
        </SafeAreaView>
      );
    }

    itemClicked(item) {
      // console.log('Item ', item.id)
      this.setState({ itemSelected: item });
      const inter = setInterval(() => {
        this.animate2();
      }, 100);

      setTimeout(() => {
        const items = item.id;
        this.props.ApiCallForTest(items);
        this.props.navigation.navigate('TestPage', { items });
        clearInterval(inter);
      }, 300);
    }

    // renderRow(item) {
    //   return (
    //     <TouchableOpacity
    //       activeOpacity={0.7}
    //       onPress={() => this.itemClicked(item)}
    //       style={{
    //         marginVertical: 3, borderColor: 'black', opacity: 0.8, borderBottomWidth: 0.4, flexDirection: 'row', alignItems: 'center', padding: 10, marginHorizontal: 10, backgroundColor: 'white', flex: 1
    //       }}
    //     >
    //       <Image
    //         style={{ width: 50, height: 50, borderRadius: 25 }}
    //         source={require('./../../assets/logo.jpg')}
    //       />

    //       <Text numberOfLines={1} style={{ width: 200, fontSize: 20, marginLeft: 10 }}>{item.name}</Text>
    //     </TouchableOpacity>
    //   );
    // }

    _renderRow(item) {
      const width1 = this.animatedValue2.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [scale(-37), scale(-28), scale(-37)]
      });
      let passed = false;
      let percentageValue = '';
      this.state.TestResult.map((obj) => {
        // console.log('Hello there', obj);
        if (item.id === obj.TestId) {
          passed = true;
          percentageValue = obj.percentage;
        }
      });
      // console.log('REnder of thr home', item.id, this.state.TestResult.TestId);
      return (
        <Animatable.View
          animation={this.state.itemSelected === item ? 'pulse' : ''}
          iterationCount={this.state.itemSelected === item ? 1 : undefined}
          direction={this.state.itemSelected === item ? 'alternate' : undefined}
          duration={this.state.itemSelected === item ? 300 : undefined}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => this.itemClicked(item)}
            style={{
              marginVertical: scale(3), borderColor: 'black', opacity: 0.8, borderBottomWidth: 0.4, flexDirection: 'row', alignItems: 'center', padding: scale(10), backgroundColor: 'white', flex: 1,
            }}
          >
            <Animated.Image
              style={{ width: scale(50), height: scale(50), borderRadius: scale(25) }}
              source={require('./../../assets/logo.jpg')}
            />
            <Text numberOfLines={1} style={{ width: scale(70), fontSize: scale(20), marginLeft: scale(10) }}>{item.name}</Text>

            <View style={{ justifyContent: 'center', alignItems: 'center', height: scale(50) }}>
              <TouchableOpacity onPress={() => this.resultHistoryClick(item.id)}>
                <IconMenu name="info-with-circle" size={scale(19)} color={this.props.appColor} />
              </TouchableOpacity>
              {passed ? RightAns : <View />}
              {/* {passed ? <Text>{`${percentageValue}%`}</Text> : <View />} */}
            </View>
          </TouchableOpacity>
        </Animatable.View>
      );
    }

    async resultHistoryClick(data) {
      const dataFrom = await _frealm.realmGetAllData(data);
      // console.log('Data at compo', dataFrom);
      this.props.navigation.navigate('Result', { dataForTestResult: dataFrom, id: data });
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

function mapStateToProps(state) {
  const { ReducerSignup } = state;
  const { ReducerMenu } = state;
  const { ReducerSettings } = state;
  const { ReducerResult } = state;
  return {
    data: ReducerSignup.data,
    AllTestDetail: ReducerSignup.AllTestDetail,
    navigateToChat: ReducerMenu.navigateToChat,
    navigateScreen: ReducerMenu.navigateScreen,
    appColor: ReducerSettings.appColor,
    TestResult: ReducerResult.TestResult

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
