import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../components/header';
import AppButton from '../components/appButton'
import Noti from '../components/notification'

export default function SignUp({navigation}){

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [location, setLocation] = useState('')
    const [desc, setDesc] = useState('')

    const [noti, setNoti] = useState('')
    const [showNoti, setShowNoti] = useState(false)

    const checkIfExists = () => {
        fetch(`http://192.168.0.26:8080/contactOther/${email}`, () => 
        method='GET')
        .then((response) => response.json())
        .then((json) => {
            if(json.length == 0){
                signUpUser()
            }
            else{
                setNoti('A user with that email address has already been created')
                setShowNoti(true)
            }
        }).catch((error) => alert(error))
        
    }

    const signUpUser = () => {

        try{
            var exists = fetch("http://192.168.0.26:8080/contact",{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    location: location,
                    description: desc,
                })
            })
            navigation.navigate('Home')
        }
        
        catch(e){
            console.log(e)
        }
    }
    

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.container}>
                <Header text='New Live'/>

                <Noti 
                isHidden= {showNoti}
                text={noti}/>

                <Text style={styles.formText}>First Name:</Text>
                <TextInput 
                style={styles.input} 
                placeholder='e.g. Tyler'
                onChangeText={(val) => setFirstName(val)}/>

                <Text style={styles.formText}>Last Name:</Text>
                <TextInput 
                style={styles.input} 
                placeholder='e.g. Jefferson'
                onChangeText={(val) => setLastName(val)}/>

                <Text style={styles.formText}>Email:</Text>
                <TextInput 
                style={styles.input} 
                placeholder='e.g. tyler@mail.com'
                onChangeText={(val) => setEmail(val)}/>

                <Text style={styles.formText}>Location:</Text>
                <TextInput 
                style={styles.input} 
                placeholder="e.g. somecity"
                onChangeText={(val) => setLocation(val)}/>

                <Text style={styles.formText}>Description:</Text>
                <TextInput 
                multiline
                style={styles.input} 
                placeholder="e.g. a single guy looking for a 1 bedroom apartment"
                onChangeText={(val) => setDesc(val)}/>  

                <Text style={styles.formText}>Password:</Text>
                <TextInput 
                style={styles.input} 
                placeholder="e.g. password"
                secureTextEntry={true}
                onChangeText={(val) => setPassword(val)}/>



                <AppButton text="Sign Up" onPress={checkIfExists}/>

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
    }
  })