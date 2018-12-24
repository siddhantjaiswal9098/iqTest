import React, { Component } from 'react';
import { StyleSheet,Alert, Text, FlatList, View, PixelRatio, Modal, TouchableOpacity, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import * as Actions from './actions/commonAction.js'
import { bindActionCreators } from 'redux';
import Navigator from './navigation/navigation';
var Spinner = require('react-native-spinkit');
import SideMenu from 'react-native-side-menu';
import Menu from './components/menu/Menu.js'
import ReducerSpinner from './reducers/ReducerSpinner.js';

class Index extends Component {
    constructor(props) {
        super(props);
       // this.toggle = this.toggle.bind(this);
        this.state = {
            spinnerData : this.props.spinnerData,
            isOpen: false,
            selectedItem: 'About',
        };
    }
    componentWillReceiveProps(nextProps){
       // alert(nextProps.sideMenuToggle);
        this.setState({spinnerData: nextProps.spinnerData});
       //  if(nextProps.sideMenuToggle&& !this.state.isOpen){
            this.setState({isOpen: nextProps.sideMenuToggle });
      //   }
    }
    onMenuItemSelected = item =>{
        if(item=='Contact Us'){
            Alert.alert(item,"siddhantjai9098@gmail.com")
        }
        else{
        Alert.alert(item," Will be implemented Soon..!!")
        }
    // this.setState({
    //   isOpen: false,
    //   selectedItem: item,
    // });
    }
    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected}/>;
        return (
            <View style={styles.container}>
            <SideMenu
                menu={menu}
                disableGestures={true}
                onChange={(isOpen)=>{
                    if(!isOpen){
                       this.props.closeMenu()
                    }
                }}
                isOpen={this.state.isOpen}>
                    <Navigator />
                </SideMenu>
                {this.state.spinnerData?
                        <Modal
                            transparent={true}
                            visible={this.state.spinnerData}>
                            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(52, 52, 52, 0.8)', alignItems: 'center' }}>
                                <Spinner style={{ marginBottom: 50 }} isVisible={true} size={50} type={'Circle'} color={'#008080'} />
                            </View>
                        </Modal> :<View />}
            </View>
        );
    }
}
function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);

}
function mapStateToProps(state) {
    console.log("State",state)
    const ReducerSignup = state.ReducerSignup;
    const ReducerSpinner = state.ReducerSpinner;
    const ReducerMenu = state.ReducerMenu;
    return {
        spinnerData : ReducerSpinner.spinnerData,
        sideMenuToggle : ReducerMenu.sideMenuToggle
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#008080'
    },
});
