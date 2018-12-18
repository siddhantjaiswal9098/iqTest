import { Platform, StyleSheet,Dimensions } from 'react-native';
import scale from './../../utils/scale.js'
const { height, width } = Dimensions.get('window');
module.exports = StyleSheet.create({

    container: {
        flex: 1,
    },
    ImageBackground: {
        position: 'absolute',
        height: 200,
        width: 200,
        borderRadius: 100,
        alignSelf: 'center',
        top: height / 2 - 100
    },
    headerView: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#61abea',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    headerText: {
        fontSize: 28,
        color: 'white',
        fontWeight: 'bold',
    },
    headerLogout: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        right: 10,
        position: 'absolute'
    },
    MenuBtnHome:{   
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        left: 10,
        position: 'absolute'
    },
    feedbackIcon: {
        height: 70,
        width: 70,
    },
    modalViewContainer:{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    modalViewContainer2:{ 
        height: 150, 
        backgroundColor: 'white', 
        opacity: .8, 
        width: 200, 
        borderWidth: .5, 
        borderColor: 'black', 
        borderRadius: 10 
    },
    closeModal:{
         alignItems: 'flex-end',
          marginRight: 10, 
          marginTop: 5,
           fontSize: 20 
        },
        okCancelView:{
             flexDirection: 'row', 
             paddingHorizontal: 40,
              paddingVertical: 30,
              justifyContent: 'center',
              alignItems: 'center'
             }
});