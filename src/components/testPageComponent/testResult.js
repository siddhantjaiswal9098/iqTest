import React, { Component } from 'react';
import { Dimensions, StyleSheet, Alert, Text, View, SafeAreaView, PixelRatio, TouchableOpacity, Image, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import * as Actions from './../../actions/commonAction'
import { bindActionCreators } from 'redux';
const { height, width } = Dimensions.get('window');
import styles from './style.js'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
const userIcon = (<Icon name="checkcircle" size={27} color="green" />)
const userIcon2 = (<Icon2 name="circle-with-cross" size={30} color="red" />)

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
        <TouchableOpacity style={{ borderColor: rightAns ? 'green': 'red', borderWidth: 2.4, opacity: .8, alignItems: 'center', padding: 10, marginHorizontal: 10, borderRadius: 5, marginVertical: 1, backgroundColor: 'white', flex: 1 }}>
          <Text style={{ fontSize: 18 }}>{item.question} </Text>
          <Text numberOfLines={1} style={{ fontSize: 23 }}>{item.answer}</Text>
          <View style={{position: 'absolute', right: 5,bottom:5}}>
          
          {rightAns ? userIcon: userIcon2}
        </View>
        </TouchableOpacity>
        {
          index < this.state.totalQues - 1 ? <View /> : <View style={{ marginBottom: 50 }} />
        }
         
      </View>
    );
  }
  render() {
    //console.log("this.state.answerKey", this.state.answerKey)
    return (
      <SafeAreaView style={styles.container2}>
        <Image
          style={styles.imageBackground2}
          source={require('./../../assets/logo.jpg')}
        />
        <Text style={{ fontSize: 30, color: 'white' }}>Result :- {this.state.marks}/{this.state.totalQues}</Text>
        <FlatList
          data={this.state.answerKey}
          // style={{marginBottom:40,opacity:0}}
          renderItem={({ item, index }) => this.renderRow(item, index)
          }
        />
        <View style={styles.takeAnotherTestView}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.takeAnotherTestText}>Take another test.</Text>
          </TouchableOpacity>
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
  return {
    data: ReducerSignup.data,
    answerKey: ReducerSignup.answerKey,
    userAnswer: ReducerSignup.userAnswer,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(testResult);


