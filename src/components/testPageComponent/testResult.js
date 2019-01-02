import React, { Component } from 'react';
import { Dimensions, StyleSheet, Alert, Text, View, SafeAreaView, PixelRatio, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import * as Actions from './../../actions/commonAction'
import { bindActionCreators } from 'redux';
const { height, width } = Dimensions.get('window');
import styles from './style.js'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import scale from './../../utils/scale.js'

import TakeTestIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import GenerateCert from 'react-native-vector-icons/FontAwesome5';

const TakeTestIcon2 = (<TakeTestIcon name="certificate" size={scale(30)} color="#000" />)
const GenerateCert2 = (<GenerateCert name="home" size={scale(30)} color="#000" />)

const userIcon = (<Icon name="checkcircle" size={scale(27)} color="green" />)
const userIcon2 = (<Icon2 name="circle-with-cross" size={scale(30)} color="red" />)

class testResult extends Component {
  constructor(props) {
    super(props);


    this.state = {
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
    console.log("!!!!!!QWE", this.props.answerKey, this.props.userAnswer);
    var marks = 0;
    //console.log("!!!!!!",answerKey.length);
    this.state.answerKey.map((obj) => {
      this.state.userAnswer.map((obj2) => {
        if (obj.answer == obj2.label) {
          //console.log("ArrayAnswer", obj.arrAnswers, obj2.label)
          marks = marks + 1;
        }


      })
    })
    this.setState({ marks })
  }
  renderRow(item, index) {
    //console.log("Jadu+++++",index, item)
    //  console.log("Result Data",this.state.userAnswer)
    let rightAns=false;
    this.state.userAnswer.map((obj) => {
       if( obj.index==index+1&&obj.label==item.answer){
          rightAns=true;
          console.log("OBJ Result",obj.index,item.answer)
       }
    })
    return (
      <View>
        <TouchableOpacity style={{ borderColor: rightAns ? 'green': 'red', borderWidth: 2.4, opacity: .8, alignItems: 'center', padding: scale(10), marginHorizontal: scale(10), borderRadius: scale(5), marginVertical: scale(1), backgroundColor: 'white', flex: 1 }}>
          <Text style={{ fontSize: scale(18) }}>{item.question} </Text>
          <Text numberOfLines={1} style={{ fontSize: scale(23) }}>{item.answer}</Text>
          <View style={{position: 'absolute', right: scale(5),bottom:scale(5)}}>
          
          {rightAns ? userIcon: userIcon2}
        </View>
        </TouchableOpacity>
        {
          index < this.state.totalQues - 1 ? <View /> : <View style={{ marginBottom: scale(50) }} />
        }
         
      </View>
    );
  }
  render() {
    //console.log("this.state.answerKey", this.state.answerKey)
    var value=(this.state.marks/this.state.totalQues)*100;
    var percentage = Math.round(value * 100) / 100
    return (
      <SafeAreaView style={[styles.container2, { backgroundColor: this.props.appColor }]}>
        <Image
          style={styles.imageBackground2}
          source={require('./../../assets/logo.jpg')}
        />
        {/* <Text style={{ fontSize: scale(30), color: 'white' }}>Result :- {this.state.marks}/{this.state.totalQues}</Text> */}
        <Text style={{ fontSize: scale(30), color: 'white' }}>Result :- {percentage>50? 'PASS': 'FAIL'}</Text>
        <Text style={{ fontSize: scale(30), color: 'white' }}>percentage :- {percentage}%</Text>
        <FlatList
          data={this.state.answerKey}
          renderItem={({ item, index }) => this.renderRow(item, index)
          }
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.takeAnotherTestView}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
            <View style={styles.takeAnotherTestText}>{GenerateCert2}<Text  style={{
        fontSize: scale(12)}}> Take another test.</Text></View>
          </TouchableOpacity>
          {
            percentage>=0 ? 
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Certificate',percentage={percentage})}>
             <View style={styles.takeAnotherTestText}>{TakeTestIcon2}<Text  style={{
        fontSize: scale(12)}}> Generate Certificate</Text></View>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => Alert.alert("You have failed the Test.")}>
          <View style={styles.takeAnotherTestText}>
          {TakeTestIcon2}
          <Text style={{
        fontSize: scale(12)}}> 
            Generate Certificate
            </Text>
            </View>
        </TouchableOpacity>
          }
        </View >
      </SafeAreaView>

    );
  }
  createAccountpage() {
    const { navigate } = this.props.navigation;
    navigate('Signup');
  }
  logInUser() {

    if (this.props.data.email == this.state.email && this.state.password == this.props.data.password) {
      //alert("valid user");
      const { navigate } = this.props.navigation;
      navigate('Home');
    }
    else {
      Alert.alert("This is not a valid user detail");
    }
  }
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators(Actions, dispatch);

}
function mapStateToProps(state) {
  const ReducerSignup = state.ReducerSignup;
  const ReducerSettings = state.ReducerSettings;
  return {
    data: ReducerSignup.data,
    answerKey: ReducerSignup.answerKey,
    userAnswer: ReducerSignup.userAnswer,
    appColor: ReducerSettings.appColor
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(testResult);


