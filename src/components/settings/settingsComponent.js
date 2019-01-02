import React, { Component } from 'react';
import { Dimensions, Modal, Alert, SafeAreaView, Text, View, PixelRatio, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon4 from 'react-native-vector-icons/Entypo';
import Icon5 from 'react-native-vector-icons/Ionicons';
import BackIcon from 'react-native-vector-icons/Ionicons';
const BackIcon2 = (<BackIcon name="md-arrow-back" size={30} color="#fff" />)

import scale from './../../utils/scale.js'
const userIcon = (<Icon name="account-edit" size={30} color="#fff" />)
const userIcon2 = (<Icon2 name="chat" size={30} color="#fff" />)
const userIcon3 = (<Icon3 name="notifications-active" size={30} color="#fff" />)
const userIcon4 = (<Icon4 name="help" size={30} color="#fff" />)
const userIcon5 = (<Icon5 name="ios-color-fill" size={30} color="#fff" />)
import RadioGroup from 'react-native-radio-buttons-group';

import { connect } from 'react-redux';
import styles from './styles.js';
import * as Actions from './../../actions/commonAction'
import { bindActionCreators } from 'redux';
import { NavigationActions, StackActions } from 'react-navigation';
const { height, width } = Dimensions.get('window');
const textMax = 300;
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
class SettingsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback: '',
            remaining: textMax,
            avatarSource: null,
            ModalToggle: false
        };
    }
    userChangeAppColor() {
        this.setState({ ModalToggle: true })
    }
    onPress = (dataforRadio) => {
        console.log("dataforRadio from Radio", dataforRadio);
        dataforRadio.map(obj => {

            if (obj.selected) {
                if (obj.label == 'default') {
                    this.props.ChangeAppColorAction('#61abea');
                }
                else if (obj.label == 'light-green') {
                    this.props.ChangeAppColorAction('#23AF69');
                }
                else if (obj.label == 'purple') {
                    this.props.ChangeAppColorAction('#9933FF');
                }
                else {
                    this.props.ChangeAppColorAction(obj.label);
                }
            }
        })

    }

    render() {
        console.log("))))", this.props.appColor);
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: this.props.appColor }]}>
                <View style={[styles.headerView, { backgroundColor: this.counter < 60 ? 'red' : this.props.appColor }]}>

                    <Text style={styles.headerText}>Settings</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backBtnChat}>
                        {BackIcon2}
                        <Text></Text>
                    </TouchableOpacity>
                </View>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={{ uri }} />
                {this.props.data && this.props.data.email && <Text style={styles.email}>{this.props.data.email}</Text>}
                {this.props.data && this.props.data.name && <Text style={styles.name}>{this.props.data.name} {this.props.data.lname}</Text>}
            </View>
            <View style={{ flex: .7, justifyContent: 'space-around', marginLeft: 10 }}>
                <TouchableOpacity onPress={() => Alert.alert("Will be implemented soon.")} style={{ flexDirection: 'row', padding: 2, borderBottomWidth: 1, borderColor: 'white' }}>
                    {userIcon}
                    <Text
                        style={styles.item}>
                        Accounts
                            </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert("Will be implemented soon.")} style={{ flexDirection: 'row', padding: 2, borderBottomWidth: 1, borderColor: 'white' }}>
                    {userIcon2}
                    <Text
                        style={styles.item}>
                        Chats
                            </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Alert.alert("Will be implemented soon.")} style={{ flexDirection: 'row', padding: 2, borderBottomWidth: 1, borderColor: 'white' }}>
                    {userIcon3}
                    <Text
                        style={styles.item}>
                        Notification
                            </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('HelpComponent')} style={{ flexDirection: 'row', padding: 2, borderBottomWidth: 1, borderColor: 'white' }}>
                    {userIcon4}
                    <Text
                        style={styles.item}>
                        Help
                            </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.userChangeAppColor()} style={{ flexDirection: 'row', padding: 2, borderBottomWidth: 1, borderColor: 'white' }}>
                    {userIcon5}
                    <Text
                        style={styles.item}>
                        theme
                            </Text>
                </TouchableOpacity>
            </View>
                {
            this.state.ModalToggle ?
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.ModalToggle}>
                    <View style={styles.modalViewContainer}>
                        <View style={styles.modalViewContainer2}>
                            <TouchableOpacity style={styles.closeModal} onPress={() => this.setState({ ModalToggle: false })}>
                                <Text style={{ fontSize: scale(20) }}>x</Text>
                            </TouchableOpacity>
                            <Text style={{ marginTop: 10, alignSelf: 'center', fontWeight: 'bold', fontSize: 16 }}>Choose a app Color.</Text>
                            <View style={{ marginTop: 10 }}>
                                <RadioGroup radioButtons={[
                                    {
                                        label: 'light-green',
                                    },
                                    {
                                        label: 'gray',
                                    },
                                    {
                                        label: 'purple',
                                    },
                                    {
                                        label: 'orange',
                                    },
                                    {
                                        label: 'default',
                                    },
                                ]}
                                    onPress={(dataforRadio) => this.onPress(dataforRadio)} />
                            </View>
                        </View>
                    </View>
                </Modal> : <View />
        }
            </SafeAreaView >

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
export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);

