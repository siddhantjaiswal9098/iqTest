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
        height: scale(200),
        width: scale(200),
        borderRadius: scale(100),
        alignSelf: 'center',
        top: height / 2 - scale(150)
    },
    imageBackground2: {
        position: 'absolute',
        height: scale(200),
        width: scale(200),
        borderRadius: scale(100),
        alignSelf: 'center',
        top: height / 2 - scale(100)
    },
    prevBtn: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: scale(30),
        bottom: 0,
        zIndex: 5000,
        justifyContent: 'center'
    },
    nextBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: scale(30),
        bottom: 0,
        zIndex: 5000,
        justifyContent: 'center'
    },
    TestIdView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(20)
    },
    TestIdText: {
        fontSize: scale(24),
        paddingVertical: scale(20),
        color: 'white',
        fontWeight: 'bold',
    },
    TextTimer: {
        fontWeight: 'bold',
        fontSize: scale(20),
        color: 'white',
        paddingVertical: scale(20),
    },
    submitView: {
        backgroundColor: 'white',
        marginVertical: scale(10),
        alignItems: 'center',
        width: width - scale(10),
        paddingVertical: scale(10),
        marginHorizontal: scale(5),
        paddingHorizontal: scale(10),
        borderRadius: scale(5),
        padding: scale(20)
    },
    modalContainer: {
        flex: 1,

        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancelBtnView: {
        height: scale(170),
        backgroundColor: 'white',
        opacity: 1,
        width: scale(250),
        borderWidth: .5,
        borderColor: 'black',
        borderRadius: scale(10)
    },
    modalBtnText: {
        alignItems: 'flex-end',
        marginRight: scale(10),
        marginTop: scale(5),
        fontSize: scale(20)
    },
    okCancelView: {
        flexDirection: 'row',
        paddingHorizontal: scale(40),
        paddingVertical: scale(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancelText: {
        padding: scale(10),
        backgroundColor: '#61abea',
        color: 'white',
        marginRight: scale(10)
    },
    okText: {
        padding: scale(10),
        backgroundColor: '#61abea',
        color: 'white'
    },
    takeAnotherTestView: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: scale(10),
        zIndex: 5000,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    takeAnotherTestText: {
        backgroundColor: '#cccccc',
        margin: scale(10),
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10
        
    }
});