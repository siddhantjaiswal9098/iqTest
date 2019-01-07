

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

export default createStackNavigator({
  SplashScreen: { screen: SplashScreen, navigationOptions: { header: null } },
  Signup: { screen: Signup, navigationOptions: { header: null, } },
  logIn: { screen: logIn, navigationOptions: { header: null, } },
  Home: { screen: Home, navigationOptions: { header: null } },
  Feedback: { screen: Feedback, navigationOptions: { title: 'Feedback' } },
  TestPage: { screen: TestPage, navigationOptions: { header: null, }, },
  testResult: { screen: testResult, navigationOptions: { header: null, }, },
  Certificate: { screen: Certificate, navigationOptions: { header: null, }, },
  ChattingHome: { screen: ChattingHome, navigationOptions: { header: null, }, },
  ChatPage: { screen: ChatPage, navigationOptions: { header: null, }, },
  SettingsComponent: { screen: SettingsComponent, navigationOptions: { header: null, }, },
  HelpComponent: { screen: HelpComponent },
  TutorialComponent: { screen: TutorialComponent },
  GameComponent: { screen: GameComponent, navigationOptions: { header: null, }, },

});
