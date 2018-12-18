import { Platform, StyleSheet, PixelRatio } from 'react-native';
import scale from './../../utils/scale.js'


module.exports = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#61abea',

    },
    registration: {
        fontSize: 23,
        marginBottom: 20,
        marginTop: 20
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
    imageBackground: {
        height: 200
        , width: 200,
        marginTop: 30,
        borderRadius: 100,
        alignSelf: 'center',
    },
    createAccount: {
        marginTop: 20,
        backgroundColor: 'white',
        padding: 10
    }
});
