import React, { Component } from 'react';
import {
  StyleSheet, Alert, Clipboard, Text, Toast, View, PixelRatio, Modal, TouchableOpacity, Image, TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SideMenu from 'react-native-side-menu';
import * as Actions from './actions/commonAction';
import Navigator from './navigation/navigation';
import Menu from './components/menu/Menu';

const Spinner = require('react-native-spinkit');

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinnerData: this.props.spinnerData,
      isOpen: false,
      selectedItem: 'About',
    };
  }

  componentWillReceiveProps(nextProps) {
    // alert(nextProps.sideMenuToggle);
    this.setState({ spinnerData: nextProps.spinnerData });
    //  if(nextProps.sideMenuToggle&& !this.state.isOpen){
    this.setState({ isOpen: nextProps.sideMenuToggle });
    //   }
  }

    onMenuItemSelected = (item) => {
      if (item === 'Contact Us') {
        Alert.alert('siddhantjai9098@gmail.com', 'Email has been copied to clipboard');

        Clipboard.setString('siddhantjai9098@gmail.com');
      } else if (item === 'Chat Page') {
        this.props.navigateToChatting('ChattingHome');
      } else if (item === 'Home') {
        this.props.navigateToChatting(item);
      } else if (item === 'Settings') {
        this.props.navigateToChatting('SettingsComponent');
      } else if (item === 'About Us') {
        this.props.navigateToChatting('HelpComponent');
      } else {
        Alert.alert(item, ' Will be implemented Soon..!!');
      }
    }

    render() {
      const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
      return (
        <View style={styles.container}>
          <SideMenu
            menu={menu}
            disableGestures
            onChange={(isOpen) => {
              if (!isOpen) {
                this.props.closeMenu();
              }
            }}
            isOpen={this.state.isOpen}
          >
            <Navigator />
          </SideMenu>
          {this.state.spinnerData
            ? (
              <Modal
                transparent
                visible={this.state.spinnerData}
              >
                <View style={{
                  flex: 1, justifyContent: 'center', backgroundColor: 'rgba(52, 52, 52, 0.8)', alignItems: 'center'
                }}
                >
                  <Spinner style={{ marginBottom: 50 }} isVisible size={50} type="Circle" color="#008080" />
                </View>
              </Modal>
            ) : <View />}
        </View>
      );
    }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}
function mapStateToProps(state) {
  // console.log("State",state)
  const { ReducerSpinner } = state;
  const { ReducerMenu } = state;
  return {
    spinnerData: ReducerSpinner.spinnerData,
    sideMenuToggle: ReducerMenu.sideMenuToggle
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#008080'
  },
});
