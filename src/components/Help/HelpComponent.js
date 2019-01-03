import React, { Component } from 'react';
import { Dimensions, Alert, StyleSheet, WebView, ScrollView, Text, View, PixelRatio, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const Icon2 = (<Icon name="send" size={40} color="#fff" />)
import { connect } from 'react-redux';
import * as Actions from './../../actions/commonAction'
import { bindActionCreators } from 'redux';
import { NavigationActions, StackActions } from 'react-navigation';

const { height, width } = Dimensions.get('window');
const textMax = 300;
class HelpComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback: '',
            remaining: textMax,
            avatarSource: null,
        };
    }
    render() {
        const data = this.props.data;
        if(!__DEV__){
            //code condition for IOS release if in future needed.
            URI = {uri: 'file:///android_asset/Help.html'}
         }
         else{
            URI = require('./Help.html');
         }
        return (
            <View style={styles.container} >
                <WebView
                    source={URI}
                    style={{ marginTop: 20,marginBottom: 20 }}
                />
            </View>

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
export default connect(mapStateToProps, mapDispatchToProps)(HelpComponent);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
});
