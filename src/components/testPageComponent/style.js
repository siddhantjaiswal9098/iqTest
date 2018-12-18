import { Platform, StyleSheet, Dimensions } from 'react-native';
import scale from './../../utils/scale.js'
const { height, width } = Dimensions.get('window');


module.exports = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#61abea'
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#61abea',
    },
   
    imageBackground: {
        position: 'absolute',
        height: 200,
        width: 200,
        borderRadius: 100,
        alignSelf: 'center',
        top: height / 2 - 150
    },
    imageBackground2: {
        position: 'absolute',
        height: 200,
        width: 200,
        borderRadius: 100,
        alignSelf: 'center',
        top: height / 2 - 100
    },
    prevBtn: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: 30,
        bottom: 0,
        zIndex: 5000,
        justifyContent: 'center'
    },
    nextBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 30,
        bottom: 0,
        zIndex: 5000,
        justifyContent: 'center'
    },
    TestIdView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    TestIdText: {
        fontSize: 24,
        paddingVertical: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    TextTimer: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        paddingVertical: 20,
    },
    submitView: {
        backgroundColor: 'white',
        marginVertical: 10,
        alignItems: 'center',
        width: width - 10,
        paddingVertical: 10,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        padding: 20
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancelBtnView: {
        height: 150,
        backgroundColor: 'white',
        opacity: .8,
        width: 200,
        borderWidth: .5,
        borderColor: 'black',
        borderRadius: 10
    },
    modalBtnText: {
        alignItems: 'flex-end',
        marginRight: 10,
        marginTop: 5,
        fontSize: 20
    },
    okCancelView: {
        flexDirection: 'row',
        paddingHorizontal: 40,
        paddingVertical: 30
    },
    cancelText: {
        padding: 10,
        backgroundColor: '#61abea',
        color: 'white',
        marginRight: 10
    },
    okText: {
        padding: 10,
        backgroundColor: '#61abea',
        color: 'white'
    },
    takeAnotherTestView: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 10,
        zIndex: 5000,
        justifyContent: 'center',
        alignItems: 'center'
    },
    takeAnotherTestText: {
        backgroundColor: '#cccccc',
        padding: 10
    }
});