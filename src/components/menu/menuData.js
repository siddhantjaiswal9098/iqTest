import React, { Component } from 'react';
import {
  Dimensions, ScrollView, Text, View, TouchableOpacity, Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import scale from '../../utils/scale';

import * as Actions from '../../actions/commonAction';
import styles from './style';

const userIcon = (<Icon name="home" size={scale(30)} color="#fff" />);
const userIcon2 = (<Icon2 name="library-books" size={scale(30)} color="#fff" />);
const userIcon3 = (<Icon3 name="search" size={scale(30)} color="#fff" />);
const userIcon4 = (<Icon4 name="book" size={scale(30)} color="#fff" />);
const userIcon5 = (<Icon name="contacts" size={scale(30)} color="#fff" />);

const { height, width } = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURI: this.props.data && this.props.data.imageURI ? { uri: this.props.data.imageURI.path } : { uri },
      //  onItemSelected: this.props.onItemSelected

    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data.imageURI) {
      this.setState({ imageURI: { uri: nextProps.data.imageURI.path } });
    }
  }

  render() {
    return (
      <ScrollView scrollsToTop={false} style={[styles.menu, { backgroundColor: this.props.appColor }]}>
        <View style={{
          height: height - scale(30),
          paddingLeft: 20,
          width,
          flex: 1
        }}
        >
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={this.state.imageURI}
            />
            {this.props.data && this.props.data.email && <Text style={styles.email}>{this.props.data.email}</Text>}
            {this.props.data && this.props.data.name && (
            <Text style={styles.name}>
                {this.props.data.name}
                {' '}
                {this.props.data.lname}
            </Text>
            )}
          </View>
          <View style={{ flex: 0.6, justifyContent: 'space-around', }}>
            {/* <View style={{ justifyContent: 'space-between',flex: 1,backgroundColor: 'green' }}> */}

            <TouchableOpacity onPress={() => this.props.onItemSelected('Home')} style={{ flexDirection: 'row' }}>
              {userIcon}
              <Text
                style={styles.item}
              >
                                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onItemSelected('Chat Page')} style={{ flexDirection: 'row', padding: 2 }}>
              {userIcon2}
              <Text
                style={styles.item}
              >
                                Chatting
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onItemSelected('Settings')} style={{ flexDirection: 'row', padding: 2 }}>
              {userIcon3}
              <Text
                style={styles.item}
              >
                                Settings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onItemSelected('About Us')} style={{ flexDirection: 'row', padding: 2 }}>
              {userIcon4}
              <Text
                style={styles.item}
              >
                                About Us
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onItemSelected('Contact Us')} style={{ flexDirection: 'row', padding: 2 }}>
              {userIcon5}
              <Text
                style={styles.item}
              >
                                Contact Us
              </Text>
            </TouchableOpacity>
            {/* </View> */}
          </View>
          <View style={styles.iqTestFooterView}>
            <Image
              style={styles.AppLogo}
              source={require('./../../assets/logo.jpg')}
            />
            <View>
              <Text style={styles.iqTestFooter}>
                            iQtest
              </Text>
              <Text style={styles.iqTestFooterVersion}>
                            v1.0
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
