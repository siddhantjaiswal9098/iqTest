import { Platform, StyleSheet } from 'react-native';
import scale from './../../utils/scale.js'


module.exports =  StyleSheet.create({
 
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#61abea',
      
    },
    registration : {
      fontSize : 23,
      marginBottom : 20,
      marginTop: 20
    },
    inputfield : {
      height: 45,
      width : 200,
      borderBottomColor: 'gray',
        borderBottomWidth: 1,
        
    },
    createAccount : {
        padding: 20,
        paddingLeft : 100,
        paddingRight : 100,
        paddingTop : 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        color : 'white',
    },
    signinbtn : {
      marginTop : 30,
    },
    text1 : {
      marginTop : 30,
    },
    inlineView : {
      flexDirection : 'row',
      marginTop : 8,
    },
    viewfont : {
      marginTop : 10  ,
      marginRight : 4,
      },
      ImageBackGround:{
        height: 200,
        width: 200,
        marginTop : 30,
        borderRadius: 100,
        alignSelf: 'center',
      },
      loginText: {
        padding : 10,
        fontSize: 15,
        marginTop: 20,
        backgroundColor: 'white',
        },
  });