import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableWithoutFeedback, Keyboard, Formik } from 'react-native';
import Header from '../components/header';
import AppButton from '../components/appButton'
import Noti from '../components/notification'

import * as yup from 'yup'

export default function SignIn({navigation}){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [noti, setNoti] = useState('')
    const [showNoti, setShowNoti] = useState(false)


    const checkIfExists = () => {
        fetch(`http://192.168.0.26:8080/contactOther/${email}`, () => 
        method='GET')
        .then((response) => response.json())
        .then((json) => {
            if(json.length == 1 && password === json[0].password){
                navigation.navigate('TenOrLord', {user: json[0]})
            }
            else{
                setNoti('We cannot find that account on file')
                setShowNoti(true)
            }
        }).catch((error) => alert(error))
        
    }
    

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.container}>

                <Header 
                 text='New Live'/>

                <Noti 
                isHidden= {showNoti}
                text={noti}/>

                <Text style={styles.formText}>Email:</Text>
                <TextInput 
                style={styles.input} 
                placeholder='e.g. tyler@mail.com'
                onChangeText={(val) => setEmail(val)}/>

                <Text style={styles.formText}>Password:</Text>
                <TextInput 
                style={styles.input} 
                placeholder="e.g. password"
                secureTextEntry={true}
                onChangeText={(val) => setPassword(val)}/>


                <AppButton text="Sign In" onPress={checkIfExists}/>

                <StatusBar style="auto" />
            </View>
        </TouchableWithoutFeedback>

        
    );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#fff',
    },
    input:{
        borderWidth:1,
        borderColor: '#777',
        borderRadius:8,
        padding:8,
        margin:10,
        color:'black',
        alignItems:'center',
        textAlign:'center',
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'#E9F6FF'
    },
    formText:{
        alignItems:'center',
        textAlign:'center',
        fontSize:18,
    },
  });