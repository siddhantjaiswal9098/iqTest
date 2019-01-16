

import { createStackNavigator } from 'react-navigation';
import Signup from '../components/signUp/signUp';
import logIn from '../components/logIn/logIn';
import Home from '../components/homeComponent/home';
import TestPage from '../components/testPageComponent/testPage';
import testResult from '../components/testPageComponent/testResult';
import SplashScreen from '../components/splash/splashScreen';
import Feedback from '../components/feedbackComponent/feedback';
import Certificate from '../components/certificate/certificateComponent';
import ChattingHome from '../components/chatting/chattingHome';
import ChatPage from '../components/chatting/chatPage';
import SettingsComponent from '../components/settings/settingsComponent';
import HelpComponent from '../components/Help/HelpComponent';
import TutorialComponent from '../components/tutorials/tutorialComponent';
import GameComponent from '../components/game/gameComponent';
import Result from '../components/result/resultComponent';
import ProfileChange from '../components/settings/profileChange'

export default createStackNavigator({
  SplashScreen: { screen: SplashScreen, navigationOptions: { header: null } },
  Signup: { screen: Signup, navigationOptions: { header: null, } },
  logIn: { screen: logIn, navigationOptions: { header: null, } },
  Home: { screen: Home, navigationOptions: { header: null } },
  Feedback: { screen: Feedback, navigationOptions: { header: null } },
  TestPage: { screen: TestPage, navigationOptions: { header: null, }, },
  testResult: { screen: testResult, navigationOptions: { header: null, }, },
  Certificate: { screen: Certificate, navigationOptions: { header: null, }, },
  ChattingHome: { screen: ChattingHome, navigationOptions: { header: null, }, },
  ChatPage: { screen: ChatPage, navigationOptions: { header: null, }, },
  SettingsComponent: { screen: SettingsComponent, navigationOptions: { header: null, }, },
  HelpComponent: { screen: HelpComponent, navigationOptions: { header: null, }, },
  TutorialComponent: { screen: TutorialComponent, navigationOptions: { header: null, }, },
  GameComponent: { screen: GameComponent, navigationOptions: { header: null, }, },
  Result: { screen: Result, navigationOptions: { header: null, }, },
  ProfileChange: { screen: ProfileChange, navigationOptions: { header: null, }, },
});
