import React, { Component } from 'react';
import {
  SafeAreaView, Image,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GiftedChat } from 'react-native-gifted-chat';
import HeaderComponent from '../header/headerComponent';
import * as Actions from '../../actions/commonAction';
import styles from './styles';

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.state.params.item.key
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          // eslint-disable-next-line react/no-access-state-in-setstate
          text: `Hello its ${this.state.user} here chat will be implemented soon.`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (

      <SafeAreaView style={styles.container}>
        <Image
          style={[styles.ImageBackground, { opacity: 0.5 }]}
          source={require('./../../assets/logo.jpg')}
        />
        <HeaderComponent navigationFromPage={this.props.navigation} headerText={this.state.user} />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
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
  const { ReducerSettings } = state;
  return {
    data: ReducerSignup.data,
    appColor: ReducerSettings.appColor
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
