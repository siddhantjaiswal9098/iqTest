import React, { Component } from 'react';
import {Dimensions,Alert,FlatList,SafeAreaView,Text,View,PixelRatio,TouchableOpacity,Image,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const Icon2 = (<Icon name="send" size={40} color="#fff" />)
import IconMenu from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import * as Actions from './../../actions/commonAction'
import {bindActionCreators} from 'redux';
import styles from './styles.js'
import { GiftedChat } from 'react-native-gifted-chat';
const { height, width } = Dimensions.get('window');
const textMax = 300;
const IconMenu2 = (<IconMenu name="md-arrow-back" size={30} color="#fff" />)
class ChatPage extends Component {
      constructor(props){
        super(props);
        this.state = {
			feedback: '',
			remaining: textMax,
            avatarSource: null,
            user: this.props.navigation.state.params.item.key
		};
  }
  _submitFeedback(){
    if(this.state.feedback!=''){
    Alert.alert("Your Feedback has been Submitted.")
      this.setState({feedback: ''});
    }
    else{
      Alert.alert("Feedback can not be Empty..!!")
    }
  }
  itemClicked(item) {
    this.props.navigation.navigate('ChatPage')

}
renderRow(item) {
    return (
        <TouchableOpacity activeOpacity={.7} onPress={() => this.itemClicked(item)} style={{ marginVertical: 3, borderColor: 'black', opacity: .8, borderBottomWidth: 0.4, flexDirection: 'row', alignItems: 'center', padding: 10, marginHorizontal: 10, backgroundColor: 'white', flex: 1 }}>
            <Image
                style={{ width: 50, height: 50, borderRadius: 25 }}
                source={require('./../../assets/logo.jpg')}
            />

            <Text numberOfLines={1} style={{ width: 200, fontSize: 20, marginLeft: 10 }}>jadu</Text>
        </TouchableOpacity>
    );
}
UNSAFE_componentWillMount(){
    this.setState({
        messages: [
          {
            _id: 1,
            text: 'Hello '+ this.state.user,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ],
      })
}
onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
    render() {
     const data = this.props.data;
       return (
        
        <SafeAreaView style={styles.container}>
        <Image
            style={[styles.ImageBackground,{opacity: .5}]}
            source={require('./../../assets/logo.jpg')}
        />
        <View style={[styles.headerView, { backgroundColor: this.props.appColor }]}>
            <Text style={styles.headerText}>{this.state.user}</Text>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.MenuBtnHome}>
                {IconMenu2}
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => { this.setState({ ModalClose: true }) }} style={styles.headerLogout}>
                {Icon2}
            </TouchableOpacity> */}
        </View>
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
    const ReducerSignup = state.ReducerSignup;
    const ReducerSettings = state.ReducerSettings;
    return {
        data: ReducerSignup.data,
        appColor: ReducerSettings.appColor
    }
    }
export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
  
