import React, { Component } from 'react';
import {Dimensions,Alert,StyleSheet,ScrollView,Text,View,PixelRatio,TouchableOpacity,Image,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const Icon2 = (<Icon name="send" size={40} color="#fff" />)
import {connect} from 'react-redux';
import * as Actions from './../../actions/commonAction'
import {bindActionCreators} from 'redux';
import { NavigationActions, StackActions } from 'react-navigation';
const { height, width } = Dimensions.get('window');
const textMax = 300;
class Feedback extends Component {
      constructor(props){
        super(props);
        this.state = {
			feedback: '',
			remaining: textMax,
			avatarSource: null,
		};
  }
    
   
  componentDidMount(){
    // let {navigation} = this.props;
    // let toRoute='Signup';
    // setTimeout(()=>{
    //   const resetAction = StackActions.reset({
    //     index: 0,
    //     actions: [
    //       NavigationActions.navigate({ routeName: toRoute })
    //     ]
    //   });
    //   navigation.dispatch(resetAction);
    // },300)
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
    render() {
     const data = this.props.data;
       return (
        <View style={styles.container} >
				<ScrollView keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false}>
					<View>
						<Text numberOfLines={3} style={styles.tagLineText}>{
                            'We are listening to what you have to say.\nPlease let us know how you would like iqTest to work better for you.'
                            }</Text>
					</View>

					<TextInput
						ref={'feedback'}
						underlineColorAndroid='transparent'
						style={styles.description}
						clearButtonMode='while-editing'
						placeholder={'Feedback...'}
						multiline={true}
						maxLength={textMax}
						numberOfLines={10}
						onChangeText={(feedback) => this.setState({ feedback, remaining: textMax - feedback.length })}
						value={this.state.feedback} />
					<Text style={{ color: 'gray' }}>{this.state.remaining} characters remaining</Text>
					<View style={styles.btnContainer}>
						<TouchableOpacity style={{backgroundColor: '#61abea', padding: 10,paddingTop: 15,paddingRight: 15, borderRadius: 60}} onPress={() => { this._submitFeedback(); }} >
            {Icon2}
							{/* <Image style={{height:60,width: 60}} source={require('./../../assets/feedback.png')} /> */}
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
           
      );
    }
  }
   
function mapDispatchToProps(dispatch) {

  return bindActionCreators(Actions, dispatch);
  
}
function mapStateToProps(state) {
    const ReducerSignup = state.ReducerSignup;  
  return {
         data :  ReducerSignup.data
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
  

const styles = StyleSheet.create({
 
    container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		padding: 20,
	},
    tagLineText: {
		marginLeft: 10,
		width: width - 20,
		fontSize: 15,
		color: 'grey',
		alignSelf: 'flex-start'
	},
    description: {
		marginTop:20,
		borderColor: 'rgb(117, 117, 117)',
		borderWidth: 1,
		borderRadius: 4,
		height: 150,
		fontSize: 12, 
		//fontFamily: 'ubuntu',
		paddingHorizontal: 5,
		textAlignVertical: 'top',
	},
    btnContainer: {
		alignItems: 'flex-end', 
		paddingTop: 20
	},
    createAccount : {
        padding: 20,
        paddingLeft : 100,
        paddingRight : 100,
        paddingTop : 40,
         //backgroundColor : '#00F1B8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        color : 'white',
    },
    signinbtn : {
      marginTop : 30,
    },
    text1 : {
      marginTop : 30,
    },
    inlineView : {
      flexDirection : 'row',
      marginTop : 8,
    },
    viewfont : {
      marginTop : 10  ,
      marginRight : 4,
    //  borderBottomColor: 'gray',
    //  borderBottomWidth: 1,
      },
      radiobtnview : {
        flexDirection : 'row',
        marginTop : 20,
      //  selectedButtonColor='#757171',
       // backgroundColor : '#00F1B8',
       
      },
  });
 