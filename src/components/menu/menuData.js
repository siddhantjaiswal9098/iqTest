import React, { Component } from 'react';
import { Dimensions, Alert, StyleSheet, ScrollView, Text, View, PixelRatio, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import scale from './../../utils/scale.js'

import { connect } from 'react-redux';
import * as Actions from './../../actions/commonAction'
import { bindActionCreators } from 'redux';
import styles from './style';
import { NavigationActions, StackActions } from 'react-navigation';
const userIcon = (<Icon name="home" size={30} color="#fff" />)
const userIcon2 = (<Icon2 name="library-books" size={30} color="#fff" />)
const userIcon3 = (<Icon3 name="search" size={30} color="#fff" />)
const userIcon4 = (<Icon4 name="book" size={30} color="#fff" />)
const userIcon5 = (<Icon name="contacts" size={30} color="#fff" />)

const { height, width } = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //  onItemSelected: this.props.onItemSelected
        };
    }

    render() {
        return (
            <View style={{ height: height, width: width, flex: 1, }} >

                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{ uri }} />
                    {this.props.data &&this.props.data.email&&<Text style={styles.email}>{this.props.data.email}</Text>}
                    {this.props.data&&this.props.data.name&& <Text style={styles.name}>{this.props.data.name} {this.props.data.lname}</Text>}
                </View>
                <View style={{justifyContent: 'space-between',height : scale(300)}}>
                <View style={{flexDirection: 'row'}}>
               {userIcon}
                    <Text
                        onPress={() => this.props.onItemSelected('Lobby')}
                        style={styles.item}>
                        Lobby
                </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
               {userIcon2}
                    <Text
                        onPress={() => this.props.onItemSelected('Library')}
                        style={styles.item}>
                        Library
                </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
               {userIcon3}
                    <Text
                        onPress={() => this.props.onItemSelected('Search')}
                        style={styles.item}>
                        Search
                </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
               {userIcon4}
                    <Text
                        onPress={() => this.props.onItemSelected('About Us')}
                        style={styles.item}>
                        About Us
                </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
               {userIcon5}
                    <Text
                        onPress={() => this.props.onItemSelected('Contact Us')}
                        style={styles.item}>
                        Contact Us
                </Text>
                </View>
                </View>
                <View style={styles.iqTestFooterView}>
                    <Image
                        style={styles.AppLogo}
                        source={require('./../../assets/logo.jpg')} />
                    <Text style={styles.iqTestFooter}>
                        iQtest
                    </Text>
                </View>
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
        data: ReducerSignup.data
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);

