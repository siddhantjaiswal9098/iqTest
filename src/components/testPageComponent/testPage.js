import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, Dimensions, Alert, Modal, FlatList, Animated, Easing, View, PixelRatio, TouchableOpacity, Image, TextInput } from 'react-native';
import { connect } from 'react-redux';
import * as Actions from './../../actions/commonAction'
import { bindActionCreators } from 'redux';
import styles from './style.js'
import Carousel from 'react-native-snap-carousel';
import RadioGroup from 'react-native-radio-buttons-group';
import IconCoro from 'react-native-vector-icons/AntDesign';
import scale from './../../utils/scale.js'

const IconNext = (<IconCoro name="right" size={scale(30)} color="#000" />)
const IconPrev = (<IconCoro name="left" size={scale(30)} color="#000" />)
const { height, width } = Dimensions.get('window');

class TestPage extends Component {
    constructor(props) {
        super(props);
        this.arrAnswers = [];
        this.timer = setInterval(() => this.setState({ textTimer: this.counter-- }), 1000);
        this.counter = 300;
        this.animatedValue = new Animated.Value(0)
        this.state = {
            id: this.props.navigation.state.params.items,
            password: this.props.data.password,
            name: '',
            lname: '',
            //data: JSON.parse(this.props.dataApiTest).data,
            data: [],
            textTimer: 300,
            modalVisible: false,
            itne: ''
        };
    }
    componentDidMount() {
        this.animate()
        console.log("data on component:-", this.props.response2new);

    }
    animate() {
        this.animatedValue.setValue(0)
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }
        ).start(() => this.animate())
    }
    _renderItem({ item, index }) {
        return (
            <View style={{ flex: 1, opacity: 0.7, backgroundColor: 'white', marginHorizontal: 5, paddingHorizontal: 10, borderRadius: 5 }}>
                <Text style={{ paddingVertical: 20, fontSize: 20 }}>
                    {index + 1}) {item.question}
                </Text>
                <View style={{ alignItems: 'flex-start' }}>
                    <RadioGroup radioButtons={[
                        {
                            label: item.option[0],
                        },
                        {
                            label: item.option[1],
                        },
                        {
                            label: item.option[2],
                        },
                        {
                            label: item.option[3],
                        },
                        {
                            label: item.option[4],
                        },
                    ]}
                        onPress={(dataforRadio) => this.onPress(dataforRadio, index)} />
                </View>
            </View>
        );
    }
    onPress = (dataforRadio, index) => {
        console.log("dataforRadio from Radio", dataforRadio);
        dataforRadio.map(obj => {

            if (obj.selected) {
                var flagData = true;
                this.arrAnswers.map((obj2) => {
                    console.log("Map1", obj2.index)
                    if (obj2.index == index + 1) {
                        // alert("Same Data")
                        objAns = {
                            index: index + 1,
                            label: obj.label
                        }
                        console.log("Map2", obj.label);
                        this.arrAnswers[index] = objAns;
                        flagData = false;
                    }
                })
                if (flagData) {
                    // alert("First")
                    objAns = {
                        index: index + 1,
                        label: obj.label
                    }
                    this.arrAnswers.push(objAns);
                }
            }
        }
        );
        console.log('dataforRadio', this.arrAnswers);
        this.setState({ dataforRadio });
    }
    timeFormatter(timeInSeconds) {
        let d = Number(timeInSeconds);
        let h = Math.floor(d / 3600);
        let m = Math.floor(d % 3600 / 60);
        let s = Math.floor(d % 3600 % 60);
        let hDisplay = h > 0 ? h + (':') : '';
        let mDisplay = m > 0 ? m + (':') : '00:';
        let sDisplay = s >= 0 ? (s < 10 ? '0' + s : s) : '';

        return (hDisplay + mDisplay + sDisplay);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.dataApiTest });
    }
    timeExpiredNavigate(){
    clearInterval(this.timer);
            this.props.SaveResult(this.state.data, this.arrAnswers);
            
            if (this.state.modalVisible) {
                this.setState({ modalVisible: false });
            }
            else{
            setTimeout(() => {
                Alert.alert("TimeOut")
            }, 1000);  
            this.props.navigation.navigate('testResult');
        }
    }
    render() {
        if (this.counter < 0) {
            this.timeExpiredNavigate()
        }
        return (
            <SafeAreaView style={styles.container}>
                <Image
                    style={styles.imageBackground}
                    source={require('./../../assets/logo.jpg')}
                />
                <View style={styles.prevBtn}>
                    <TouchableOpacity onPress={() => this._carousel.snapToPrev()}>
                        {IconPrev}
                    </TouchableOpacity>
                </View >
                <View style={styles.nextBtn}>
                    <TouchableOpacity onPress={() => this._carousel.snapToNext()}>
                        {IconNext}
                    </TouchableOpacity>
                </View>
                <View style={styles.TestIdView}>
                    <Text style={styles.TestIdText}>
                        Test No. :- {this.state.id}
                    </Text>
                    <Text style={styles.TextTimer}>
                        {this.timeFormatter(this.state.textTimer)}
                    </Text>
                </View>
                <Carousel
                    style={{ flex: 1 }}
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.data}

                    renderItem={(item) => this._renderItem(item)}
                    sliderWidth={width}
                    itemWidth={width}
                />
                <TouchableOpacity style={styles.submitView} onPress={() => this.submitModal()}>
                    <Text >SUBMIT</Text>
                </TouchableOpacity>
                {
                    this.state.modalVisible ?
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.modalVisible}>
                            <View style={styles.modalContainer}>
                                <View style={styles.cancelBtnView}>
                                    <TouchableOpacity style={styles.modalBtnText} onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}>
                                        <Text>
                                            x
                                </Text>
                                    </TouchableOpacity>
                                    <Text style={{ paddingHorizontal: scale(20), fontSize: scale(15) }}>You have <Text style={{fontWeight:'bold',color:'red'}}>{this.state.itne}</Text> questions remaining..Do you really want to Submit your test?</Text>
                                    <View style={styles.okCancelView}>
                                        <TouchableOpacity onPress={() => this.setState({ modalVisible: !this.state.modalVisible })} style={{ padding: scale(10), paddingHorizontal: scale(2), backgroundColor: '#61abea', width: scale(80), justifyContent: 'center', alignItems: 'center', marginRight: scale(10) }}>
                                            <Text style={{ color: 'white', fontSize: scale(15) }}>
                                                Cancel
                                        </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.submitAns()} style={{ padding: scale(10), paddingHorizontal: scale(2), backgroundColor: 'red', width: scale(80), justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: scale(15) }}>
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
    submitModal() {
        console.log("@@@@@@@", this.arrAnswers.length, this.state.data.length)
        var questionNumber = this.state.data.length - this.arrAnswers.length;
        this.setState({ modalVisible: !this.state.modalVisible, itne: questionNumber })
    }
    submitAns() {
        this.props.SaveResult(this.state.data, this.arrAnswers);
        clearInterval(this.timer);
        this.props.navigation.navigate('testResult')
        this.setState({ modalVisible: !this.state.modalVisible })
    }

}

function mapDispatchToProps(dispatch) {

    return bindActionCreators(Actions, dispatch);

}
function mapStateToProps(state) {
    const ReducerSignup = state.ReducerSignup;
    return {
        data: ReducerSignup.data,
        dataApiTest: ReducerSignup.dataApiTest
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TestPage);



