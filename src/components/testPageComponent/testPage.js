import React, { Component } from 'react';
import {
  SafeAreaView, ScrollView, Text, Dimensions, Alert, Modal, Animated, Easing, View, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Carousel from 'react-native-snap-carousel';
import RadioGroup from 'react-native-radio-buttons-group';
import IconCoro from 'react-native-vector-icons/AntDesign';
import scale from '../../utils/scale';
import HeaderComponent from '../header/headerComponent';
import styles from './style';
import * as Actions from '../../actions/commonAction';

const IconNext = (<IconCoro name="right" size={scale(25)} color="#000" />);
const IconPrev = (<IconCoro name="left" size={scale(25)} color="#000" />);
const { width } = Dimensions.get('window');

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.arrAnswers = [];
    this.timer = setInterval(() => this.setState({ textTimer: this.counter-- }), 1000);
    this.counter = 300;
    this.animatedValue = new Animated.Value(0);
    this.state = {
      id: this.props.navigation.state.params.items,
      password: this.props.data.password,
      name: '',
      lname: '',
      // data: JSON.parse(this.props.dataApiTest).data,
      data: [],
      textTimer: 300,
      modalVisible: false,
      itne: '',
      dataLen: 0,
    };
  }

  componentDidMount() {
    this.animate();
    console.log('data on component:-', this.props.response2new);
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
    ).start(() => this.animate());
  }

  _renderItem({ item, index }) {
    return (
      <View style={{ flex: 1, }}>
        <View style={{
          alignItems: 'center', opacity: 0.7, padding: 5, marginVertical: scale(2), marginHorizontal: scale(5), borderRadius: 5, justifyContent: 'center', backgroundColor: 'white'
        }}
        >

          <Text style={{ fontSize: scale(18) }}>
            {index + 1}
            /
            {this.state.dataLen}
          </Text>
        </View>
        <View style={{
          flex: 1, opacity: 0.7, backgroundColor: 'white', marginHorizontal: scale(5), paddingHorizontal: scale(10), borderRadius: 5
        }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{ paddingVertical: scale(20), fontSize: scale(20) }}>
              {/* {index + 1}
)
              {' '} */}
              {item.question}
            </Text>
            <View style={{ alignItems: 'flex-start', marginLeft: scale(10) }}>
              {this.randomData(item.option, index)}
            </View>
          </ScrollView>
        </View>

      </View>
    );
  }

  randomData(item, index) {
    const nums = [0, 1, 2, 3, 4];
    const ranNums = [];
    let i = nums.length;
    let j = 0;
    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      ranNums.push(nums[j]);
      nums.splice(j, 1);
    }
    // console.log('Randon number----->>>>>', ranNums);
    return (
      <RadioGroup
        radioButtons={[
          {
            label: item[ranNums[0]],
          },
          {
            label: item[ranNums[1]],
          },
          {
            label: item[ranNums[2]],
          },
          {
            label: item[ranNums[3]],
          },
          {
            label: item[ranNums[4]],
          },
        ]}
        onPress={dataforRadio => this.onPress(dataforRadio, index)}
      />
    );
  }

    onPress = (dataforRadio, index) => {
      // console.log("dataforRadio from Radio", dataforRadio);
      dataforRadio.map((obj) => {
        console.log('inside map', obj);
        if (obj.selected) {
          console.log('inside map OBJ', obj.selected, this.arrAnswers);
          let flagData = true;
          this.arrAnswers.map((obj2) => {
            console.log('Map1', obj2.index, index + 1);
            if (obj2.index === index + 1) {
              // Alert.alert('Same Data');
              const objAns = {
                index: index + 1,
                label: obj.label
              };
              // console.log("Map2", obj.label);
              // this.arrAnswers.splice(index - 2, 1, objAns);
              this.arrAnswers[index] = objAns;
              flagData = false;
            }
          });
          if (flagData) {
            // Alert.alert('First');
            const objAns = {
              index: index + 1,
              label: obj.label
            };
            this.arrAnswers.push(objAns);
          }
        }
      });
      console.log('dataforRadio', this.arrAnswers);
      this.setState({ dataforRadio });
    }

    timeFormatter(timeInSeconds) {
      const d = Number(timeInSeconds);
      const h = Math.floor(d / 3600);
      const m = Math.floor(d % 3600 / 60);
      const s = Math.floor(d % 3600 % 60);
      const hDisplay = h > 0 ? `${h}:` : '';
      const mDisplay = m > 0 ? `${m}:` : '00:';
      const sDisplay = s >= 0 ? (s < 10 ? `0${s}` : s) : '';

      return (hDisplay + mDisplay + sDisplay);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      this.setState({ data: nextProps.dataApiTest, dataLen: nextProps.dataApiTest.length });
    }

    timeExpiredNavigate() {
      clearInterval(this.timer);
      const arr = this.arrAnswers.filter(Boolean);
      this.props.SaveResult(this.state.data, arr);

      if (this.state.modalVisible) {
        this.setState({ modalVisible: false });
      } else {
        setTimeout(() => {
          Alert.alert('TimeOut');
        }, 1000);
        this.props.navigation.navigate('testResult', { testId: this.props.navigation.state.params.items });
      }
    }

    render() {
      if (this.counter < 0) {
        this.timeExpiredNavigate();
      }
      return (
      // <SafeAreaView style={[styles.container,{backgroundColor: this.counter<60?this.counter%2==0?'red':'#61abea': '#61abea'}]}>
        <SafeAreaView style={[styles.container, { backgroundColor: this.props.appColor }]}>
          <HeaderComponent navigationFromPage={this.props.navigation} headerText={`Test: ${this.state.id}`} />
          <Text style={[styles.TextTimer, { color: this.counter < 60 ? 'red' : 'white' }]}>
            {this.timeFormatter(this.state.textTimer)}
          </Text>
          <Image
            style={styles.imageBackground}
            source={require('./../../assets/logo.jpg')}
          />
          <View style={styles.prevBtn}>
            <TouchableOpacity onPress={() => this._carousel.snapToPrev()}>
              {IconPrev}
            </TouchableOpacity>
          </View>
          <View style={styles.nextBtn}>
            <TouchableOpacity onPress={() => this._carousel.snapToNext()}>
              {IconNext}
            </TouchableOpacity>
          </View>
          <Carousel
            style={{ flex: 1 }}
            ref={(c) => { this._carousel = c; }}
            data={this.state.data}

            renderItem={item => this._renderItem(item)}
            sliderWidth={width}
            itemWidth={width}
          />
          <TouchableOpacity style={styles.submitView} onPress={() => this.submitModal()}>
            <Text style={{ fontSize: scale(16) }}>SUBMIT</Text>
          </TouchableOpacity>
          {
                    this.state.modalVisible
                      ? (
                        <Modal
                          animationType="fade"
                          transparent
                          visible={this.state.modalVisible}
                        >
                          <View style={styles.modalContainer}>
                            <View style={styles.cancelBtnView}>
                              <TouchableOpacity style={styles.modalBtnText} onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}>
                                <Text>
                                            x
                                </Text>
                              </TouchableOpacity>
                              <Text style={{ paddingHorizontal: scale(20), fontSize: scale(15) }}>
                                {' '}
                                {this.state.itne ? (
                                  <Text>
                                    {' '}
                                    You have
                                    {' '}
                                    <Text style={{ fontWeight: 'bold', color: 'red' }}>{this.state.itne}</Text>
                                    {' '}
                                    questions remaining..
                                  </Text>
                                ) : <Text />}
                                Do you really want to Submit your test?
                              </Text>
                              <View style={styles.okCancelView}>
                                <TouchableOpacity
                                  onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}
                                  style={{
                                    padding: scale(10), paddingHorizontal: scale(2), backgroundColor: this.props.appColor, width: scale(80), justifyContent: 'center', alignItems: 'center', marginRight: scale(10)
                                  }}
                                >
                                  <Text style={{ color: 'white', fontSize: scale(15) }}>
                                                Cancel
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => this.submitAns()}
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
        </SafeAreaView>
      );
    }

    submitModal() {
      console.log('@@@@@@@', this.arrAnswers.length, this.state.data.length);
      const questionNumber = this.state.data.length - this.arrAnswers.length;
      this.setState({ modalVisible: !this.state.modalVisible, itne: questionNumber });
    }

    submitAns() {
      const arr = this.arrAnswers.filter(Boolean);
      this.props.SaveResult(this.state.data, arr);
      clearInterval(this.timer);
      this.props.navigation.navigate('testResult', { testId: this.props.navigation.state.params.items });
      this.setState({ modalVisible: !this.state.modalVisible });
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
    dataApiTest: ReducerSignup.dataApiTest,
    appColor: ReducerSettings.appColor
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
