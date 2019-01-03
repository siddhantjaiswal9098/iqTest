import React, { Component } from 'react';
import {
  Text, View, ScrollView, Alert, TouchableOpacity, Image, TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions, StackActions } from 'react-navigation';
import BackIcon from 'react-native-vector-icons/Ionicons';
import * as Actions from '../../actions/commonAction';
import styles from './style';

const userIcon = (<Icon name="user-o" size={30} color="#000" />);
const lockIcon = (<Icon1 name="lock" size={30} color="#000" />);
const BackIcon2 = (<BackIcon name="md-arrow-back" size={30} color="#fff" />);


class logIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.data.email,
      password: this.props.data.password,
      name: '',
      lname: '',
      data: this.props.data,
      imageURI: this.props.data.imageURI ? { uri: this.props.data.imageURI.path } : require('./../../assets/logo.jpg'),
    };
  }


  componentDidMount() {
  }

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: this.props.appColor,
        }}
      >
        {/* <View style={[styles.headerView, { backgroundColor: this.counter < 60 ? 'red' : this.props.appColor }]}> */}
        <View style={[styles.headerView, { backgroundColor: this.props.appColor }]}>
          <Text style={styles.headerText} />
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backBtnChat}>
            {BackIcon2}
            <Text />
          </TouchableOpacity>
        </View>
        <View style={[styles.container, { backgroundColor: this.props.appColor }]}>

          <Image
            style={styles.ImageBackGround}
            source={this.state.imageURI}
          />
          <Text style={styles.registration}>
            LOGIN
          </Text>
          <View style={styles.inlineView}>
            <View style={styles.viewfont}>
              {userIcon}
            </View>
            <TextInput
              style={styles.inputfield}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              placeholder="SomeUser@gmail.com" />
          </View>
          <View style={styles.inlineView}>
            <View style={styles.viewfont}>
              {lockIcon}
            </View>
            <TextInput
              style={styles.inputfield}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              placeholder="*********"
            />
          </View>

          <TouchableOpacity onPress={() => this.logInUser()}>
            <Text style={styles.loginText}>
              Log In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.createAccountpage()} >
            <Text style={styles.signinbtn}>
              Create New Account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    );
  }

  createAccountpage() {
    const { navigate } = this.props.navigation;
    navigate('Signup');
  }

  logInUser() {
    if (this.props.data.email === this.state.email &&
      this.state.password === this.props.data.password
      && this.state.email !== undefined && this.state.password !== undefined) {
      const data = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.loginClickAction(data);
      console.log('%%%%%%', this.props.AllTestDetail);
      const { navigation } = this.props;
      const toRoute = 'Home';
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: toRoute })
        ]
      });
      navigation.dispatch(resetAction);
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
  return {
    data: ReducerSignup.data,
    AllTestDetail: ReducerSignup.AllTestDetail,
    appColor: ReducerSettings.appColor
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(logIn);
