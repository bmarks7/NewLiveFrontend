import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, 
  Button, TextInput, TouchableOpacity, 
  TouchableWithoutFeedback, Keyboard, ScrollView,
  FlatList } from 'react-native';
import Header from '../components/header';
import AppButton from '../components/appButton'

export default function MainLord({navigation}){

    const [searchVal, setSearchVal] = useState('')
    const [props, setProps] = useState([])

    const getProps = () => {
      fetch(`http://192.168.0.26:8080/props/${navigation.getParam('user')._id}`, () => method='GET')
      .then((response) => response.json())
      .then((json) => {
        setProps(json)
      })
      .catch((error) => alert(error))
    }

    getProps()

    return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss()
      }}>
    
        <View style={styles.container}>
            <Header text = {navigation.getParam('user').firstName + ' ' + navigation.getParam('user').lastName}/>

            <TextInput 
            style={styles.input}
            placeholder='Search By Name(e.g. 1 some st, somecity, somestate)'
            onChangeText={(val) => setSearchVal(val)}
            />

            <ScrollView>
              {props.map(prop => (
                <TouchableOpacity key={prop._id} onPress={() => navigation.navigate('PropDetails', {prop: prop})}>
                  <View style = {styles.card} >
                    <Text style={styles.address}> {prop.address} </Text>
                    <Text style={styles.price}>Rent: ${prop.rentPrice}</Text>
                    <Text style={styles.hits}>Hits: {prop.numHits}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>


            <TouchableOpacity onPress={() => navigation.navigate('NewProp', {user: navigation.getParam('user')})} style={styles.buttonContainer}>
              <View style={styles.button}>
                  <Text style={styles.buttonText}>+</Text>
              </View>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
      </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: 'white',
      alignItems:'stretch'
    },
    button:{
      borderRadius:20,
      backgroundColor:'aqua',
      justifyContent:'center',
      margin:10,
      width:60,
      height:60
    },
    buttonText:{
      fontWeight:'bold',
      fontSize:40,
      textAlign:'center',
    },
    buttonContainer:{
      width:60,
      alignItems:'center',
      //position:'absolute',
      alignSelf:'center'
    },
    input:{
      borderRadius:10,
      borderColor:'black',
      borderStyle:'solid',
      borderWidth:1,
      padding:7,
      margin:5,
      backgroundColor:'#E9F6FF'
    },
    card:{
      borderRadius:10,
      //borderWidth:1,
      margin:20,
      backgroundColor:'#C7E9FF'
  },
  cardText:{
      width:300
  },
  address:{
      margin:10,
      fontSize:18
  },
  price:{
      margin:10,
      fontSize:15
  },
  hits:{
      margin:10,
      fontSize:15
  }
  });
