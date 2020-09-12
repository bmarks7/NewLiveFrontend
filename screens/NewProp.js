import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../components/header';
import AppButton from '../components/appButton'
import Noti from '../components/notification'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function NewProp({navigation}){

  const [address, setAddress] = useState('')
  const [price, setPrice] = useState('')

  const [noti, setNoti] = useState('')

  const checkIfExists = () => {
    fetch(`http://192.168.0.26:8080/prop/${address}`, () => 
    method='GET')
    .then((response) => response.json())
    .then((json) => {
        if(json.length == 0){
            addProp()
        }
        else{
            setNoti('A property with that address has already been created')
        }
    }).catch((error) => alert(error))
      
  }

  const addProp = () => {
    try{
        var exists = fetch("http://192.168.0.26:8080/prop", {
          method:'POST',
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
          },
          body:JSON.stringify({
            address: address,
            rentPrice: price,
            userId: navigation.getParam('user')._id,
            numHits: 0,
            hitText:'HIT'
          })
        })
      navigation.navigate('MainLord')
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
          <Header text = 'New Property'/>

          <Noti 
              text={noti}
          />

          <Text style={styles.formText}>Address:</Text>
            <GooglePlacesAutocomplete
              placeholder='e.g. 123 random st, some city, a state, in country'
              minLength={2}
              fetchDetails={true}
              autoFocus={false}
              renderDescription={row => row.description}
              onPress={(data, details = null) => {
                setAddress(data.description)
              }}
              query={{
                key: 'AIzaSyD6tsa5m_S1SYikgdQ6FPLj7N0L9LXJBh4',
                language: 'en',
              }}
              
            />

            <Text style={styles.formText}>Rent Price:</Text>
            <TextInput 
            keyboardType='numeric'
            style={styles.input} 
            placeholder='e.g. $600.00'
            onChangeText={(val) => setPrice(val) }/>


            <AppButton text="Add Property" onPress={checkIfExists}/>

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
  });
