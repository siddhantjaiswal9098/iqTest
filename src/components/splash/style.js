import { Platform, StyleSheet, PixelRatio, Dimensions } from 'react-native';
import scale from './../../utils/scale.js';
const { height, width } = Dimensions.get('window');

module.exports = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    registration: {
        marginTop: 30,
        fontSize: 23,
        marginBottom: 30,
    },
    ImageContainer: {
        borderRadius: 80,
        width: 160,
        height: 160,
        backgroundColor: '#00F1B8',
        borderColor: '#00F1B8',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DFEAE5',
        borderWidth: 12,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: .5,
        shadowRadius: 12,

    },
    inputfield: {
        height: 45,
        width: 200,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,

    },
    createAccount: {
        padding: 20,
        paddingLeft: 100,
        paddingRight: 100,
        marginTop: 40,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        color: 'white',
    },
    signinbtn: {
        marginTop: 30,

    },
    text1: {
        marginTop: 30,
    },
    inlineView: {
        flexDirection: 'row',
        marginTop: 8,
    },
    viewfont: {
        marginTop: 10,
        marginRight: 4,
    },
    radiobtnview: {
        flexDirection: 'row',
        marginTop: 20,
    },
    LinearGradientstyle: {
        padding: 15,
        alignItems: 'center',
        paddingLeft: 80,
        paddingRight: 80,
        marginTop: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    imgPlus: {
        position: 'absolute',
        top: 105,
        left: 105,
        backgroundColor: '#00F1B8',
        borderRadius: 100,
        padding: 1,

    },
    backgroundImage: {
        height: height,
        width: width,
        position: 'absolute',
        borderRadius: 100
    },
    LogoImage: {
        width: 200,
        height: 200,
        borderRadius: 100
    },
    IqData: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold'
    },
    TestData: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white'
    }
});