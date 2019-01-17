import React, { Component } from 'react';
import {
  Dimensions, Alert, StyleSheet, ScrollView, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderComponent from '../header/headerComponent';
import * as Actions from '../../actions/commonAction';
import scale from '../../utils/scale';

const { width } = Dimensions.get('window');
const Icon2 = (<Icon name="send" size={scale(40)} color="#fff" />);
const textMax = 300;
class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      remaining: textMax,
      avatarSource: null,
    };
  }

  _submitFeedback() {
    if (this.state.feedback !== '') {
      Alert.alert('Your Feedback has been Submitted.');
      this.setState({ feedback: '' });
    } else {
      Alert.alert('Feedback can not be Empty..!!');
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent navigationFromPage={this.props.navigation} headerText="Feedback" />
        <ScrollView style={{ padding: scale(20) }} keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
          <View>
            <Text numberOfLines={3} style={styles.tagLineText}>
              {
                            'We are listening to what you have to say.\nPlease let us know how you would like iqTest to work better for you.'
                            }

            </Text>
          </View>

          <TextInput
            ref="feedback"
            underlineColorAndroid="transparent"
            style={styles.description}
            clearButtonMode="while-editing"
            placeholder="Feedback..."
            multiline
            maxLength={textMax}
            numberOfLines={10}
            onChangeText={feedback => this.setState({ feedback, remaining: textMax - feedback.length })}
            value={this.state.feedback}
          />
          <Text style={{ color: 'gray', fontSize: scale(15) }}>
            {this.state.remaining}
            {' '}
characters remaining
          </Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={{
                backgroundColor: this.props.appColor, padding: scale(10), paddingTop: scale(15), paddingRight: scale(15), borderRadius: scale(60)
              }}
              onPress={() => { this._submitFeedback(); }}
            >
              {Icon2}
              {/* <Image style={{height:60,width: 60}} source={require('./../../assets/feedback.png')} /> */}
            </TouchableOpacity>
          </View>
        </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tagLineText: {
    marginLeft: scale(10),
    width: width - scale(20),
    fontSize: scale(15),
    color: 'grey',
    alignSelf: 'flex-start'
  },
  description: {
    marginTop: scale(20),
    borderColor: 'rgb(117, 117, 117)',
    borderWidth: scale(1),
    borderRadius: scale(4),
    height: scale(150),
    fontSize: scale(12),
    // fontFamily: 'ubuntu',
    paddingHorizontal: scale(5),
    textAlignVertical: 'top',
  },
  btnContainer: {
    alignItems: 'flex-end',
    paddingTop: scale(20)
  },
});
