

import {createStackNavigator} from 'react-navigation';
import Signup from './../components/signUp/signUp';
import logIn from './../components/logIn/logIn';
import Home from './../components/homeComponent/home.js'
import TestPage from './../components/testPageComponent/testPage.js'
import testResult from './../components/testPageComponent/testResult.js'
import SplashScreen from './../components/splash/splashScreen.js'
import Feedback from './../components/feedbackComponent/feedback.js'
import Certificate from './../components/certificate/certificateComponent.js'
import ChattingHome from './../components/chatting/chattingHome.js'
import ChatPage from './../components/chatting/chatPage.js'
import SettingsComponent from './../components/settings/settingsComponent.js'
import HelpComponent from './../components/Help/HelpComponent.js'
export default createStackNavigator({
 SplashScreen: {screen: SplashScreen ,navigationOptions : { header: null}},
 Signup: { screen: Signup, navigationOptions : { header: null,} },
logIn: { screen: logIn, navigationOptions : { header: null,} },
  Home  : {screen : Home,navigationOptions :{ header: null}},
  Feedback: {screen: Feedback,navigationOptions : {title : 'Feedback'}},
  TestPage : {screen : TestPage, navigationOptions : { header: null,}, },
  testResult : {screen : testResult, navigationOptions : { header: null,},},
  Certificate:{screen : Certificate, navigationOptions : { header: null,},},
ChattingHome: {screen : ChattingHome , navigationOptions : { header: null,},},
ChatPage: {screen : ChatPage , navigationOptions : { header: null,},},
SettingsComponent: {screen : SettingsComponent, navigationOptions : { header: null,},},
HelpComponent: {screen : HelpComponent},

});	
  


  