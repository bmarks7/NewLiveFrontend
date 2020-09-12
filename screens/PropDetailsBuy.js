import React, { Component, useState } from 'react'
import { Text, StyleSheet, View, Button,
        ScrollView } from 'react-native'
import AppButton from '../components/appButton'

export default function PropDetails({navigation}){

    const [prop, setProp] = useState(navigation.getParam('prop'))
    const [user, setUser] = useState(navigation.getParam('user'))
    const [hits, setHits] = useState(prop.numHits)
    const [hitText, setHitText] = useState('')
    const [byWho, setByWho] = useState('')
    const [lordEmail, setLordEmail] = useState('')
    var add = true

    const setInitialHitText = (prop) => {
        fetch(`http://192.168.0.26:8080/hit/${prop._id}/${user._id}`, 
            () => method = 'GET')
            .then((response) => response.json())
            .then((json) => {
                if(json.length == 0){ //if the prop is not hit yet
                    setHitText('HIT')
                }
                else{ // if the prop has already been hit
                    setHitText('HITED')
                }
        })
        
    }

    setInitialHitText(prop)

    const checkIfHit = () => {//checks if a hit exists between the prop and user
        try{
            fetch(`http://192.168.0.26:8080/hit/${prop._id}/${user._id}`, 
                () => method = 'GET')
                .then((response) => response.json())
                .then((json) => {
                    if(json.length == 0){ //if the prop is not hit yet                      
                        
                        add = true
                    }
                    else{ // if the prop has already been hit
                        
                        add = false
                    }
                    addHit(add, json)
                })
        }

        catch(e){
            console.log(e)
        }
    }


    const addHit = (add, hit) => {//adding hit to the database

        if(add === true){//if we need to add a hit
            // console.log('user: ' + user)
            // console.log('propid: ' + prop._id)
            // console.log('userid: ' + user._id)
            try{
                fetch("http://192.168.0.26:8080/hit", {
                    method: 'POST',
                    headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        userId: user._id,
                        propId: prop._id
                    })
                })
                setHits(hits + 1)
                setHitText('HITED')
                incHits(1)
            }

            catch(e){
                console.log(e)
            }
        }
       
        else{//if we have to remove the hit
            try{
                fetch(`http://192.168.0.26:8080/hitDel/${hit[0]._id}`, {
                    method: 'DELETE',
                })
                setHits(hits - 1)
                setHitText('HIT')
                incHits(-1)
            }

            catch(e){
                console.log(e)
            }
        }
    }

    const incHits = (value) => {//to make the added hit show up on screen and increment/decrement it in database on a prop
        try{
            fetch(`http://192.168.0.26:8080/hit/${prop._id}`, {
                method: 'PUT',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    numHits: (prop.numHits + value)
                })
            })
            navigation.navigate('MainTen')
        }

        catch(e){
            console.log(e)
        }
    }

    const getByWho = (userId) => {
        fetch(`http://192.168.0.26:8080/contactId/${prop.userId}`, ()=>method="GET")
        .then((response) => response.json())
        .then((json) => {setByWho(json[0].firstName + ' ' + json[0].lastName)})
      }
  //
    getByWho()

    const getLordEmail = (userId) => {
        fetch(`http://192.168.0.26:8080/contactId/${prop.userId}`, ()=>method="GET")
        .then((response) => response.json())
        .then((json) => {setLordEmail(json[0].email)})
      }
    getLordEmail()

    return (
        <View style = {styles.container}>

            <Text style={styles.address}> {prop.address} </Text>
            <Text style={styles.price}>Rent: ${prop.rentPrice}</Text>
            <Text style={styles.hits}>Hits: {hits}</Text>
            <Text style={styles.hits}>By: {byWho}</Text>
            <Text style={styles.hits}>Landlord Email: {lordEmail}</Text>

            <Text style={styles.hitsList}></Text>
            <AppButton text={hitText} onPress={checkIfHit}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems:'stretch',
        alignItems:'center'
    },
    cardText:{
        width:300
    },
    address:{
        borderRadius:10,
        margin:10,
        fontSize:25,
        alignSelf:'stretch',
        textAlign:'center',
        backgroundColor:'#C7E9FF'
    },
    price:{
        margin:10,
        fontSize:17
    },
    hits:{
        margin:10,
        fontSize:17
    },
    hitsList:{
        fontSize:17
    }
})