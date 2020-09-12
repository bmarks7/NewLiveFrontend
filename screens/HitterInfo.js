import React, {useState} from 'react'
import { Text, StyleSheet, View, Button,
        ScrollView } from 'react-native'
import AppButton from '../components/appButton'
import Header from '../components/header'

export default function HitterInfo({navigation}){

    const [hitter, setHitter] = useState({})

    const getHitterInfo = (userId) => {
        fetch(`http://192.168.0.26:8080/contactId/${navigation.getParam('hitterId')}`, ()=>method="GET")
        .then((response) => response.json())
        .then((json) => setHitter(json[0]))
      }

    getHitterInfo()

    return (
        <View style = {styles.container}>
            <Text style={styles.name}> {hitter.firstName} {hitter.lastName} </Text>
            <Text style={styles.location}>Location: {hitter.location}</Text>
            <Text style={styles.desc}>Description: {hitter.description}</Text>
            <Text style={styles.email}>Email: {hitter.email}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems:'stretch',
        alignItems:'center',
        textAlign:'center',
    },
    name:{
        borderRadius:10,
        margin:10,
        fontSize:25,
        alignSelf:'stretch',
        textAlign:'center',
        backgroundColor:'#C7E9FF'
    },
    location:{
        margin:10,
        fontSize:17
    },
    desc:{
        margin:10,
        fontSize:17
    },
    email:{
        margin:10,
        fontSize:17
    },
})