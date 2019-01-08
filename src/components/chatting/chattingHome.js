import React, { Component } from 'react';
import {
  FlatList, SafeAreaView, Text, View, TouchableOpacity, Image,
} from 'react-native';
import IconMenu from 'react-native-vector-icons/Entypo';
import BackIcon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/commonAction';
import styles from './styles';

const textMax = 300;
const IconMenu2 = (<IconMenu name="menu" size={30} color="#fff" />);
const BackIcon2 = (<BackIcon name="md-arrow-back" size={30} color="#fff" />);
class ChattingHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      remaining: textMax,
      avatarSource: null,
    };
  }

  itemClicked(item) {
    this.props.navigation.navigate('ChatPage', item = { item });
  }

  renderRow(item) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this.itemClicked(item)}
        style={{
          marginVertical: 3, borderColor: 'black', opacity: 0.8, borderBottomWidth: 0.4, flexDirection: 'row', alignItems: 'center', padding: 10, marginHorizontal: 10, backgroundColor: 'white', flex: 1
        }}
      >
        <Image
          style={{ width: 50, height: 50, borderRadius: 25 }}
          source={require('./../../assets/logo.jpg')}
        />

        <Text numberOfLines={1} style={{ width: 200, fontSize: 20, marginLeft: 10 }}>{item.key}</Text>
      </TouchableOpacity>
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('********', nextProps.navigateToChat);
    if (nextProps.navigateToChat == true && nextProps.navigateScreen == 'Lobby') {
      this.props.navigateToChatting(nextProps.navigateScreen);
      this.props.closeMenu();
      this.props.navigation.navigate('Home');
    }
  }

  render() {
    return (

      <SafeAreaView style={styles.container}>
        <Image
          style={styles.ImageBackground}
          source={require('./../../assets/logo.jpg')}
        />
        <View style={[styles.headerView, { backgroundColor: this.props.appColor }]}>
          <Text style={styles.headerText}>Chat</Text>
          <TouchableOpacity onPress={() => this.props.toggleMenu()} style={styles.MenuBtnHome}>
            {IconMenu2}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backBtnChat}>
            {BackIcon2}
          </TouchableOpacity>
        </View>
        <FlatList
          data={[{ key: 'Siddhant' }, { key: 'shubham' }, { key: 'Random' }, { key: 'SomeUser' }, { key: 'Example' }]}
          renderItem={({ item }) => this.renderRow(item)
            }
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}
function mapStateToProps(state) {
  const { ReducerSignup } = state;
  const { ReducerMenu } = state;
  const { ReducerSettings } = state;
  return {
    data: ReducerSignup.data,
    navigateToChat: ReducerMenu.navigateToChat,
    navigateScreen: ReducerMenu.navigateScreen,
    appColor: ReducerSettings.appColor
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ChattingHome);
