import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, Dimensions, RadioButton, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import * as Actions from './../../actions/commonAction'
import { NavigationActions, StackActions } from 'react-navigation';
import { connect } from 'react-redux';
import styles from './style';

const { height, width } = Dimensions.get('window');
const userIcon = (<Icon name="user-o" size={30} color="#000" />)
const lockIcon = (<Icon1 name="lock" size={30} color="#000" />)
const circleimg = (<Icon2 name="plus" size={30} color="#fff" />)


class SignUp extends Component {
  constructor(props) {
    super(props);



    this.state = {
      email: 'siddhantjai9098@gmail.com',
      password: '123456789',
      name: 'Siddhant',
      lname: 'Jaiswal',

    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <View style={[styles.container,{backgroundColor: this.props.appColor}]}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <Image
            style={styles.imageBackground}
            source={require('./../../assets/logo.jpg')}
          />
          <View style={[styles.container,{backgroundColor: this.props.appColor}]}>
            <Text style={styles.registration} >
              SIGNUP
          </Text>
            <Text style='styles.text1'></Text>
            <View style={styles.inlineView}>
              <View style={styles.viewfont}>
                {userIcon}
              </View>
              <TextInput
                style={styles.inputfield}
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
                placeholder='SomeUser@gmail.com' />
            </View>
            <View style={styles.inlineView}>
              <View style={styles.viewfont}>
                {lockIcon}
              </View>
              <TextInput
                style={styles.inputfield}
                onChangeText={(password) => this.setState({ password })}
                placeholder='*********'
                value={this.state.password}
                secureTextEntry={true} />
            </View>
            <View style={styles.inlineView}>
              <View style={styles.viewfont}>
                {userIcon}
              </View>
              <TextInput
                style={styles.inputfield}
                value={this.state.name}
                onChangeText={(name) => this.setState({ name })}
                placeholder='First Name' />
            </View>
            <View style={styles.inlineView}>
              <View style={styles.viewfont}>
                {userIcon}
              </View>
              <TextInput
                style={styles.inputfield}
                value={this.state.lname}
                onChangeText={(lname) => this.setState({ lname })}
                placeholder='Last Name' />
            </View>
            <View>
            </View>
            <TouchableOpacity onPress={() => this.createUser()}>

              <Text style={styles.createAccount}>
                Create Account
          </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.alreadyUser()} >
              <Text style={styles.signinbtn}>
                Already have an Account
            </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
  createUser() {

    if (this.state.email == '' || this.state.lname == '' ||
      this.state.password == '' || this.state.name == '') {
      alert('empty Value Not allowed')
    }
    else {
      this.props.SignUpSave(this.state);
      const { navigate } = this.props.navigation;
      navigate('logIn');
    }
  }
  alreadyUser() {
    const { navigate } = this.props.navigation;
    navigate('logIn');
  }
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators(Actions, dispatch);
}
function mapStateToProps(state) {
  
  const ReducerSettings = state.ReducerSettings;
  return {
    appColor: ReducerSettings.appColor

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

