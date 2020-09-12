import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from '../components/header';
import AppButton from '../components/appButton'

export default function Home({navigation}){

    const [name, setName] = useState('name1')

    const goSignUp = () => {
        navigation.navigate('SignUp')
    }

    const goSignIn = () => {
        navigation.navigate('SignIn')
    }

    return (
    
        <View style={styles.container}>
            <Header text='New Live'/>
            <Text style={styles.introText}>Find your next home</Text>
            
            <AppButton text='Sign In' onPress={goSignIn}></AppButton>
            <AppButton text='Sign Up' onPress={goSignUp}></AppButton>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#fff'
    },
    introText:{
      alignContent:'center',
      fontSize:20,
      textAlign:'center',
      justifyContent:'center',
      marginTop:150
    }
  });
