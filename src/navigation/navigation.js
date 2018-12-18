

import {createStackNavigator} from 'react-navigation';
//import {tabscr} from './components/Home/tabNavigator'

import Signup from './../components/signUp/signUp';
import logIn from './../components/logIn/logIn';
import Home from './../components/homeComponent/home.js'
import TestPage from './../components/testPageComponent/testPage.js'
import testResult from './../components/testPageComponent/testResult.js'
import SplashScreen from './../components/splash/splashScreen.js'
import Feedback from './../components/feedbackComponent/feedback.js'
export default createStackNavigator({
 SplashScreen: {screen: SplashScreen ,navigationOptions : { header: null}},
 Signup: { screen: Signup, navigationOptions : { header: null,} },
logIn: { screen: logIn,navigationOptions :{headerStyle: { backgroundColor: '#61abea',}}},
  Home  : {screen : Home,navigationOptions :{ header: null}},
  Feedback: {screen: Feedback,navigationOptions : {title : 'Feedback'}},
  TestPage : {screen : TestPage ,navigationOptions : {headerStyle: { backgroundColor: '#61abea',},title : 'IqTest'}},
  testResult : {screen : testResult, navigationOptions : { header: null,},
}
});	
  


  