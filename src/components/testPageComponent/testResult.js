import React, { Component } from 'react';
import {
  Alert, Text, BackHandler, View, SafeAreaView, TouchableOpacity, Image, FlatList, Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import TakeTestIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import GenerateCert from 'react-native-vector-icons/FontAwesome5';
import { AdMobBanner } from 'react-native-admob';
import scale from '../../utils/scale';
import styles from './style';
import * as Actions from '../../actions/commonAction';
import FinRealmService from '../../realm/realm';

const _frealm = new FinRealmService();
const { width } = Dimensions.get('window');
const TakeTestIcon2 = (<TakeTestIcon name="certificate" size={scale(30)} color="#111E6C" />);
const GenerateCert2 = (<GenerateCert name="home" size={scale(30)} color="#cccccc" />);
const userIcon = (<Icon name="checkcircle" size={scale(27)} color="green" />);
const userIcon2 = (<Icon2 name="circle-with-cross" size={scale(30)} color="red" />);
const youtubeIcon2 = (<Icon name="youtube" size={scale(30)} color="red" />);

class testResult extends Component {
  constructor(props) {
    super(props);


    this.state = {
      TestId: this.props.navigation.state.params.testId,
      email: this.props.data.email,
      password: this.props.data.password,
      name: '',
      lname: '',
      data: this.props.data,
      marks: '',
      totalQues: this.props.answerKey.length,
      answerKey: this.props.answerKey,
      userAnswer: this.props.userAnswer
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    console.log('Result Back Press');
    return true;
  }

  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    console.log('!!!!!!QWE', this.props.answerKey, this.props.userAnswer);
    let marks = 0;
    // console.log("!!!!!!",answerKey.length);
    const answerKeys = this.state.answerKey;
    let userAnswers = Array.from(this.state.userAnswer);
    answerKeys.map((obj, index) => {
      userAnswers.map((obj2) => {
        if (obj.answer === obj2.label && index + 1 === obj2.index) {
          console.log('index ans:-', index + 1, 'userAnswers:-', obj2.index);
          marks += 1;
          userAnswers.splice(obj2, 1);
          console.log('ArrayAnswer', obj.answer, obj2.label, marks);
        }
      });
    });
    const value = (marks / this.state.totalQues) * 100;
    const percentage = Math.round(value * 100) / 100;
    this.setState({ marks, percentage });
    console.log('marks:', marks, 'totalQues:', this.state.totalQues, 'percentage:', percentage, 'value:', value);
  }

  componentDidMount() {
    // console.log("DOnde with it2", this.state.percentage, this.state.TestId,  this.props.TestResult);
    const PassedResultVal = {
      percentage: this.state.percentage,
      TestId: this.state.TestId
    };
    const currentDate = new Date();
    // const PassedResultVal2 = {
    //   percentage: this.state.percentage,
    //   TestId: this.state.TestId,
    //   date: currentDate
    // };
    const PassedResultVal2 = {
      testRes: {
        result: {
          percentage: this.state.percentage,
          TestId: this.state.TestId,
          date: currentDate
        }
      },
      id: this.props.data.id
    };
    this.props.apiCallForDataSaveResult(PassedResultVal2);
    console.log('Test results at Home', this.props.TestResult, PassedResultVal);
    let good = true;
    const NewArrResult = this.props.TestResult;
    NewArrResult.map((obj) => {
      if (obj.TestId === PassedResultVal.TestId) {
        console.log('already passed');
        good = false;
      }
    });
    if (good && PassedResultVal.percentage >= 50) {
      NewArrResult.push(PassedResultVal);
      const deepCopy = Array.from(NewArrResult);
      console.log('Deep copy deepCopy', deepCopy);
      this.props.TestResultPass(deepCopy);
    }
  }

  renderRow(item, index) {
    // console.log("Jadu+++++",index, item)
    //  console.log("Result Data",this.state.userAnswer)
    let rightAns = false;
    this.state.userAnswer.map((obj) => {
      if (obj.index === index + 1 && obj.label === item.answer) {
        rightAns = true;
        console.log('OBJ Result', obj.index, item.answer);
      }
    });
    return (
      <View>
        <TouchableOpacity style={{
          borderColor: rightAns ? 'green' : 'red', borderWidth: 2.4, opacity: 0.8, alignItems: 'center', padding: scale(10), marginHorizontal: scale(10), borderRadius: scale(5), marginVertical: scale(1), backgroundColor: 'white', flex: 1
        }}
        >
          <Text style={{ fontSize: scale(18) }}>
            {item.question}
            {' '}
          </Text>
          <Text numberOfLines={1} style={{ fontSize: scale(23) }}>{item.answer}</Text>
          <View style={{ position: 'absolute', right: scale(5), bottom: scale(5) }}>

            {rightAns ? userIcon : userIcon2}
          </View>
        </TouchableOpacity>
        {
          index < this.state.totalQues - 1 ? <View /> : <View style={{ marginBottom: scale(20) }} />
        }
      </View>
    );
  }

  render() {
    // console.log("this.state.answerKey", this.state.answerKey)
    return (
      <SafeAreaView style={[styles.container2, { backgroundColor: this.props.appColor }]}>
        <Image
          style={styles.imageBackground2}
          source={require('./../../assets/logo.jpg')}
        />
        {/* <Text style={{ fontSize: scale(30), color: 'white' }}>Result :- {this.state.marks}/{this.state.totalQues}</Text> */}
        <View style={{ flexDirection: 'row', width, justifyContent: 'space-around' }}>
          <Text style={{ fontSize: scale(20), color: 'white' }}>
            Result:
            <Text style={{ color: this.state.percentage ? 'white' : 'red' }}>
              {this.state.percentage > 50 ? ' PASS' : ' FAIL'}
            </Text>
          </Text>
          <Text style={{ fontSize: scale(20), color: 'white' }}>
            percentage:
            <Text style={{ color: this.state.percentage ? 'white' : 'red' }}>
              {' '}
              {this.state.percentage}
              %
            </Text>
          </Text>
        </View>
        <FlatList
          data={this.state.answerKey}
          renderItem={({ item, index }) => this.renderRow(item, index)
          }
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={{ width, alignItems: 'center' }}>
          <AdMobBanner
            adSize="fullBanner"
            // adUnitID="ca-app-pub-1997214269651620/5618598933"
            adUnitID="ca-app-pub-3940256099942544/6300978111"
            testDevices={[AdMobBanner.simulatorId]}
            // onAdFailedToLoad={error => console.error('Error while Loading the Ads', error)}
          />
        </View>
        <View style={{
          flexDirection: 'row', backgroundColor: '#FFF', width, justifyContent: 'space-around'
        }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
            <View style={styles.takeAnotherTestText}>
              {GenerateCert2}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('TutorialComponent')}>
            <View style={styles.takeAnotherTestText}>
              {youtubeIcon2}
            </View>
          </TouchableOpacity>
          {
            this.state.percentage >= 50
              ? (
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Certificate', { percentage: this.state.percentage })}>
                  <View style={styles.takeAnotherTestText}>
                    {TakeTestIcon2}
                  </View>
                </TouchableOpacity>
              )
              : (
                <TouchableOpacity onPress={() => Alert.alert('You have failed the Test.')}>
                  <View style={styles.takeAnotherTestText}>
                    {TakeTestIcon2}
                  </View>
                </TouchableOpacity>
              )
          }
        </View>
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
  const { ReducerResult } = state;
  return {
    data: ReducerSignup.data,
    answerKey: ReducerSignup.answerKey,
    userAnswer: ReducerSignup.userAnswer,
    appColor: ReducerSettings.appColor,
    TestResult: ReducerResult.TestResult
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(testResult);
