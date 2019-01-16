import React, { Component } from 'react';
import {
  Modal, Alert, SafeAreaView, Text, View, TouchableOpacity, Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon5 from 'react-native-vector-icons/Ionicons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RadioGroup from 'react-native-radio-buttons-group';
import ImagePicker from 'react-native-image-crop-picker';
import HeaderComponent from '../header/headerComponent';
import styles from './styles';
import * as Actions from '../../actions/commonAction';
import scale from '../../utils/scale';

const userIcon = (<Icon name="account-edit" size={30} color="#fff" />);
const userIcon2 = (<Icon2 name="chat" size={30} color="#fff" />);
const userIcon3 = (<Icon3 name="notifications-active" size={30} color="#fff" />);
const userIcon4 = (<Icon2 name="help" size={30} color="#fff" />);
const userIcon5 = (<Icon5 name="ios-color-fill" size={30} color="#fff" />);
const textMax = 300;
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
class SettingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      remaining: textMax,
      avatarSource: null,
      ModalToggle: false,
      imageURI: this.props.data.imageURI ? { uri: this.props.data.imageURI.path } : require('./../../assets/logo.jpg'),
      email: 'siddhantjai9098@gmail.com',
      password: '123456789',
      name: 'Siddhant',
      lname: 'Jaiswal',
    };
  }

  userChangeAppColor() {
    this.setState({ ModalToggle: true });
  }

    onPress = (dataforRadio) => {
      console.log('dataforRadio from Radio', dataforRadio);
      dataforRadio.map((obj) => {
        if (obj.selected) {
          if (obj.label === 'default') {
            this.props.ChangeAppColorAction('#61abea');
          } else if (obj.label === 'light-green') {
            this.props.ChangeAppColorAction('#23AF69');
          } else if (obj.label === 'purple') {
            this.props.ChangeAppColorAction('#9933FF');
          } else {
            this.props.ChangeAppColorAction(obj.label);
          }
        }
      });
    }

    async openGallery() {
      await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then((imageURI) => {
        console.log(imageURI);
        this.setState({ imageURI: { uri: imageURI.path } });
        if (this.state.email === '' || this.state.lname === ''
      || this.state.password === '' || this.state.name === '') {
          Alert.alert('Empty value not allowed');
        } else {
          const data = {
            email: this.props.data.email,
            password: this.props.data.password,
            name: this.props.data.name,
            lname: this.props.data.lname,
            imageURI
          };
          this.props.SignUpSave(data);
        }
      });
    }

    render() {
      console.log('))))', this.props.appColor);
      return (
        <SafeAreaView style={[styles.container, { backgroundColor: this.props.appColor }]}>
          <HeaderComponent navigationFromPage={this.props.navigation} headerText="Settings" />
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={() => this.openGallery()}>
              <Image
                style={styles.avatar}
                source={this.state.imageURI}
              />
            </TouchableOpacity>
            {this.props.data && this.props.data.email && <Text style={styles.email}>{this.props.data.email}</Text>}
            {this.props.data && this.props.data.name && (
            <Text style={styles.name}>
              {this.props.data.name}
              {' '}
              {this.props.data.lname}
            </Text>
            )}
          </View>
          <View style={{ flex: 0.7, justifyContent: 'space-around', marginLeft: 10 }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ProfileChange')}
              style={{
                flexDirection: 'row', padding: 2, borderBottomWidth: 1, borderColor: 'white'
              }}
            >
              {userIcon}
              <Text
                style={styles.item}
              >
                        Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ChattingHome')}
              style={{
                flexDirection: 'row', padding: 2, borderBottomWidth: 1, borderColor: 'white'
              }}
            >
              {userIcon2}
              <Text
                style={styles.item}
              >
                        Chats
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Alert.alert('Will be implemented soon.')}
              style={{
                flexDirection: 'row', padding: 2, borderBottomWidth: 1, borderColor: 'white'
              }}
            >
              {userIcon3}
              <Text
                style={styles.item}
              >
                        Notification
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('HelpComponent')}
              style={{
                flexDirection: 'row', padding: 2, borderBottomWidth: 1, borderColor: 'white'
              }}
            >
              {userIcon4}
              <Text
                style={styles.item}
              >
                        Help
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.userChangeAppColor()}
              style={{
                flexDirection: 'row', padding: 2, borderBottomWidth: 1, borderColor: 'white'
              }}
            >
              {userIcon5}
              <Text
                style={styles.item}
              >
                        theme
              </Text>
            </TouchableOpacity>
          </View>
          {
            this.state.ModalToggle
              ? (
                <Modal
                  animationType="fade"
                  transparent
                  visible={this.state.ModalToggle}
                >
                  <View style={styles.modalViewContainer}>
                    <View style={styles.modalViewContainer2}>
                      <TouchableOpacity style={styles.closeModal} onPress={() => this.setState({ ModalToggle: false })}>
                        <Text style={{ fontSize: scale(20) }}>x</Text>
                      </TouchableOpacity>
                      <Text style={{
                        marginTop: 10, alignSelf: 'center', fontWeight: 'bold', fontSize: 16
                      }}
                      >
Choose a app Color.

                      </Text>
                      <View style={{ marginTop: 10 }}>
                        <RadioGroup
                          radioButtons={[
                            {
                              label: 'light-green',
                            },
                            {
                              label: 'gray',
                            },
                            {
                              label: 'purple',
                            },
                            {
                              label: 'orange',
                            },
                            {
                              label: 'default',
                            },
                          ]}
                          onPress={dataforRadio => this.onPress(dataforRadio)}
                        />
                      </View>
                    </View>
                  </View>
                </Modal>
              ) : <View />
        }
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
export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
