import React, { Component } from 'react';
import {
  Dimensions, Alert, StyleSheet, ScrollView, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toast, { DURATION } from 'react-native-easy-toast';
import HeaderComponent from '../header/headerComponent';
import * as Actions from '../../actions/commonAction';
import scale from '../../utils/scale';

const { width } = Dimensions.get('window');

const userIcon = (<Icon name="user-o" size={scale(40)} color="#FFF" />);
const lockIcon = (<Icon1 name="lock" size={scale(40)} color="#FFF" />);

class ProfileChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'siddhantjai9098@gmail.com',
      password: '123456789',
      name: 'Siddhant',
      lname: 'Jaiswal',
    };
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

  createUser() {
    const bool = this.validate(this.state.email);
    if (this.state.email === '' || this.state.lname === ''
      || this.state.password === '' || this.state.name === '') {
      Alert.alert('empty Value Not allowed');
    } else if (!bool) {
      Alert.alert('Not a valid Email address');
    } else {
      this.props.SignUpSave(this.state);
      this.refs.toast.show('Account updated successfully!');
    }
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: this.props.appColor }]}>
        <HeaderComponent navigationFromPage={this.props.navigation} headerText="Profile" />
        <View style={{
          alignItems: 'center', flex: 1
        }}
        >
          <View style={{
            backgroundColor: this.props.appColor, flex: 1, justifyContent: 'space-around', alignItems: 'center'
          }}
          >
            <View>
              <View style={styles.inputFieldData}>
                {userIcon}
                <TextInput
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                  placeholder="SomeUser@gmail.com"
                  style={styles.inputField}
                />
              </View>
              <View style={styles.inputFieldData}>
                {lockIcon}
                <TextInput
                  style={styles.inputField}
                  onChangeText={password => this.setState({ password })}
                  placeholder="*********"
                  value={this.state.password}
                  secureTextEntry
                />
              </View>
              <View style={styles.inputFieldData}>
                {userIcon}
                <TextInput
                  style={styles.inputField}
                  value={this.state.name}
                  onChangeText={name => this.setState({ name })}
                  placeholder="First Name"
                />
              </View>
              <View style={styles.inputFieldData}>
                {userIcon}
                <TextInput
                  style={styles.inputField}
                  value={this.state.lname}
                  onChangeText={lname => this.setState({ lname })}
                  placeholder="Last Name"
                />
              </View>

            </View>
            <TouchableOpacity onPress={() => this.createUser()}>

              <Text style={styles.createAccount}>
                Update Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Toast ref="toast" />
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
  return {
    data: ReducerSignup.data,
    appColor: ReducerSettings.appColor
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileChange);


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#61abea',
  },
  createAccount: {
    marginTop: scale(20),
    backgroundColor: 'white',
    padding: scale(10)
  },
  inputField: {
    width: scale(200),
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    color: 'white'
  },
  inputFieldData: {
    flexDirection: 'row',
    padding: 10,
    width,
    justifyContent: 'center'
  }
});
