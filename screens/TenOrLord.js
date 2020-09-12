import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from '../components/header';
import AppButton from '../components/appButton'

export default function TenOrLord({navigation}){

    return (
    
        <View style={styles.container}>
            <Header text="Selection"/>

            <View style={styles.content}>
                <Text style = {styles.subheader}>I am a(n): </Text>
                <AppButton text='Proprietor' onPress={() => navigation.navigate('MainLord', {user: navigation.getParam('user')})}/>
                <AppButton text='Buyer' onPress={() => navigation.navigate('MainTen', {user: navigation.getParam('user')})}/>

                <StatusBar style="auto" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#fff'
    },
    content:{
      alignContent:'center',
      fontSize:20,
      textAlign:'center',
      justifyContent:'center',
      marginTop:100
    },
    subheader:{
        textAlign:'center',
        marginTop:20,
        marginBottom:10
    }
  });