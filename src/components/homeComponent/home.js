import React, { Component } from 'react';
import { Text, FlatList, View, SafeAreaView, BackHandler, Modal, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMenu from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';
import styles from './style.js'
import * as Actions from './../../actions/commonAction'
import { bindActionCreators } from 'redux';
import scale from './../../utils/scale.js'
import { NavigationActions, StackActions } from 'react-navigation';
const Icon2 = (<Icon name="power-off" size={30} color="#fff" />)
const IconMenu2 = (<IconMenu name="menu" size={30} color="#fff" />)
const { height, width } = Dimensions.get('window');


class Home extends Component {
    _didFocusSubscription;
  _willBlurSubscription;
    constructor(props) {
        super(props);
        this.state = {
            dataForListTest: this.props.AllTestDetail,
            ModalClose: false,
            exitModal: false,
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.AllTestDetail != nextProps.AllTestDetail) {
            this.setState({ dataForListTest: nextProps.AllTestDetail })
        }
    }
    logOutClick() {
        let { navigation } = this.props;
        let toRoute = 'Signup';
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: toRoute })
            ]
        });
        navigation.dispatch(resetAction);
        this.setState({ ModalClose: false })
        //BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        this.props.signOutClicked();
    }
    feedBackBtn() {
       // BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        this.props.navigation.navigate('Feedback');
    }
    componentDidMount() {
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        this._didFocusSubscription = this.props.navigation.addListener('didFocus', payload =>
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
      ); this._didFocusSubscription = this.props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    );
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
      );
    }
    componentWillMount() {
        this.props.ApiCallForAllTestAction()
    }
    componentWillUnmount() {
        
    }

    handleBackPress = () => {
        this.setState({ exitModal: true });
        // works best when the goBack is async
        return true;
    }
    exitPress() {
        this.setState({ exitModal: false })
        BackHandler.exitApp()
    }
    render() {
        return (

            <SafeAreaView style={styles.container}>
                <Image
                    style={styles.ImageBackground}
                    source={require('./../../assets/logo.jpg')}
                />
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>Home</Text>
                    <TouchableOpacity onPress={() => this.props.toggleMenu()} style={styles.MenuBtnHome}>
                        {IconMenu2}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.setState({ ModalClose: true }) }} style={styles.headerLogout}>
                        {Icon2}
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.dataForListTest}
                    renderItem={({ item }) => this.renderRow(item)
                    }
                />
                {
                    this.state.dataForListTest && this.state.dataForListTest.length == 0 ?
                        <View style={{ position: 'absolute', top: height / 2, left: width / 2 -  scale(100) }}><Text>Fetching Latest data please wait..</Text></View>
                        :
                        <View />
                }
                <TouchableOpacity style={{ borderRadius: scale(35), position: 'absolute', right:  scale(20), bottom:  scale(30) }} onPress={() => this.feedBackBtn()}>
                    <Image
                        style={styles.feedbackIcon}
                        source={require('./../../assets/feedback.png')}
                    />
                </TouchableOpacity>
                {
                    this.state.ModalClose ?
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.ModalClose}>
                            <View style={styles.modalViewContainer}>
                                <View style={styles.modalViewContainer2}>
                                    <TouchableOpacity style={styles.closeModal} onPress={() => this.setState({ ModalClose: false })}>
                                        <Text>x</Text>
                                    </TouchableOpacity>
                                    <Text style={{ paddingHorizontal: scale(20) ,fontSize: scale(15) }}>Do you want logOut?</Text>
                                    <View style={styles.okCancelView}>
                                        <TouchableOpacity onPress={() => this.setState({ ModalClose: false })} style={{ padding: scale(10), paddingHorizontal: scale(2), backgroundColor: '#61abea', width: scale(80), justifyContent: 'center', alignItems: 'center', marginRight: scale(10) }}>
                                            <Text style={{ color: 'white',fontSize: scale(15)  }}>
                                                Cancel
                                        </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.logOutClick()} style={{ padding: scale(10), paddingHorizontal: scale(2), backgroundColor: 'red', width: scale(80), justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: 'white',fontSize: scale(15)  }}>
                                                Ok
                                        </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal> : <View />
                }
                {
                    this.state.exitModal ?
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.exitModal}>
                            <View style={styles.modalViewContainer}>
                                <View style={styles.modalViewContainer2}>
                                    <TouchableOpacity style={styles.closeModal} onPress={() => this.setState({ exitModal: false })}>
                                        <Text>x</Text>
                                    </TouchableOpacity>
                                    <Text style={{ paddingHorizontal: 20,fontSize: scale(15)  }}>Do you Really want to Exit?</Text>
                                    <View style={styles.okCancelView}>
                                        <TouchableOpacity onPress={() => this.setState({ exitModal: false })} style={{ padding: scale(10), paddingHorizontal: scale(2), backgroundColor: '#61abea', width: scale(80), justifyContent: 'center', alignItems: 'center', marginRight: scale(10) }}>
                                            <Text style={{ color: 'white', fontSize: scale(15) }}>
                                                Cancel
                                        </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.exitPress()} style={{ padding: scale(10), paddingHorizontal: scale(2), backgroundColor: 'red', width: scale(80), justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: scale(15)  }}>
                                                Ok
                                        </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal> : <View />
                }
            </SafeAreaView>
        );
    }
    itemClicked(item) {
        console.log('Item ', item.id)
        items = item.id
        this.props.ApiCallForTest(items);
      //  BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        this.props.navigation.navigate('TestPage', { items });

    }
    renderRow(item) {
        return (
            <TouchableOpacity activeOpacity={.7} onPress={() => this.itemClicked(item)} style={{ marginVertical: 3, borderColor: 'black', opacity: .8, borderBottomWidth: 0.4, flexDirection: 'row', alignItems: 'center', padding: 10, marginHorizontal: 10, backgroundColor: 'white', flex: 1 }}>
                <Image
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                    source={require('./../../assets/logo.jpg')}
                />

                <Text numberOfLines={1} style={{ width: 200, fontSize: 20, marginLeft: 10 }}>{item.name}</Text>
            </TouchableOpacity>
        );
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);

}
function mapStateToProps(state) {
    const ReducerSignup = state.ReducerSignup;
    return {
        data: ReducerSignup.data,
        AllTestDetail: ReducerSignup.AllTestDetail
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

