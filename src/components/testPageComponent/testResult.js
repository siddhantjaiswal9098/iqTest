import React, { Component } from 'react';
import {
  Alert, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList, Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import TakeTestIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import GenerateCert from 'react-native-vector-icons/FontAwesome5';
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

  UNSAFE_componentWillMount() {
    console.log('!!!!!!QWE', this.props.answerKey, this.props.userAnswer);
    let marks = 0;
    // console.log("!!!!!!",answerKey.length);
    this.state.answerKey.map((obj) => {
      this.state.userAnswer.map((obj2) => {
        if (obj.answer === obj2.label) {
          // console.log("ArrayAnswer", obj.arrAnswers, obj2.label)
          marks += 1;
        }
      });
    });
    const value = (marks / this.state.totalQues) * 100;
    const percentage = Math.round(value * 100) / 100;
    this.setState({ marks, percentage });
  }

  componentDidMount() {
    // console.log("DOnde with it2", this.state.percentage, this.state.TestId,  this.props.TestResult);
    const PassedResultVal = {
      percentage: this.state.percentage,
      TestId: this.state.TestId
    };
    const currentDate = new Date();
    const PassedResultVal2 = {
      percentage: this.state.percentage,
      TestId: this.state.TestId,
      date: currentDate
    };
    _frealm.Createrealm(PassedResultVal2);
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
      console.log('DOnde with it2', deepCopy);
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

    // if(percentage>=50){
    //   TestResultPass()
    // }
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
            this.state.percentage >= 0
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

  createAccountpage() {
    const { navigate } = this.props.navigation;
    navigate('Signup');
  }

  logInUser() {
    if (this.props.data.email === this.state.email && this.state.password === this.props.data.password) {
      // alert("valid user");
      const { navigate } = this.props.navigation;
      navigate('Home');
    } else {
      Alert.alert('This is not a valid user detail');
    }
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
