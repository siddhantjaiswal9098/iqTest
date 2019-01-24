import React, { Component } from 'react';
import {
  ScrollView, Text, View, TouchableOpacity, Image, TextInput, Alert
} from 'react-native';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './style';
import * as Actions from '../../actions/commonAction';

const userIcon = (<Icon name="user-o" size={30} color="#000" />);
const lockIcon = (<Icon1 name="lock" size={30} color="#000" />);


class SignUp extends Component {
  constructor(props) {
    super(props);


    this.state = {
      email: '',
      password: '',
      name: '',
      lname: '',
      imageURI: ''
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('Data on component SignUp', nextProps.dataSignUp);
    if (nextProps.dataSignUp !== {}) {
      const { navigate } = this.props.navigation;
      navigate('logIn');
    }
  }

  componentDidMount() {
  }

  openGallery() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then((imageURI) => {
      console.log('hello', imageURI);
      this.setState({ imageURI });
    });
  }

  validate = (text) => {
    console.log(text);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    let open = require('./../../assets/logo.jpg');
    if (this.state.imageURI) {
      // console.log(this.state.imageURI.path, 'Hello');
      open = { uri: this.state.imageURI.path };
    }
    return (
      <View style={[styles.container, { backgroundColor: this.props.appColor }]}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => this.openGallery()}>
            <Image
              style={styles.imageBackground}
              source={open}
            />
          </TouchableOpacity>
          <View style={[styles.container, { backgroundColor: this.props.appColor }]}>
            <Text style={styles.registration}>
              SIGNUP
            </Text>
            <Text style={styles.text1} />
            <View style={styles.inlineView}>
              <View style={styles.viewfont}>
                {userIcon}
              </View>
              <TextInput
                style={styles.inputfield}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                placeholder="SomeUser@gmail.com"
              />
            </View>
            <View style={styles.inlineView}>
              <View style={styles.viewfont}>
                {lockIcon}
              </View>
              <TextInput
                style={styles.inputfield}
                onChangeText={password => this.setState({ password })}
                placeholder="*********"
                value={this.state.password}
                secureTextEntry
              />
            </View>
            <View style={styles.inlineView}>
              <View style={styles.viewfont}>
                {userIcon}
              </View>
              <TextInput
                style={styles.inputfield}
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
                placeholder="First Name"
              />
            </View>
            <View style={styles.inlineView}>
              <View style={styles.viewfont}>
                {userIcon}
              </View>
              <TextInput
                style={styles.inputfield}
                value={this.state.lname}
                onChangeText={lname => this.setState({ lname })}
                placeholder="Last Name"
              />
            </View>
            <View />
            <TouchableOpacity onPress={() => this.createUser()}>

              <Text style={styles.createAccount}>
                Create Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.alreadyUser()}>
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
    const bool = this.validate(this.state.email);
    if (this.state.email === '' || this.state.lname === ''
      || this.state.password === '' || this.state.name === '') {
      Alert.alert('empty Value Not allowed');
    } else if (!bool) {
      Alert.alert('Not a valid Email address');
    } else {
      this.props.SignUpSave(this.state);
      // const { navigate } = this.props.navigation;
      // navigate('logIn');
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
  const { ReducerSignup } = state;
  const { ReducerSettings } = state;
  return {
    appColor: ReducerSettings.appColor,
    dataSignUp: ReducerSignup.dataSignUp,

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
