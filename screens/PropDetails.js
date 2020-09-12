import React, {useState} from 'react'
import { Text, StyleSheet, View, Button,
        ScrollView, TouchableOpacity } from 'react-native'
import AppButton from '../components/appButton'

export default function PropDetails({navigation}){

    const [prop, setProp] = useState(navigation.getParam('prop'))
    const [hits, setHits] = useState([])


    const getHits = () =>(
        fetch(`http://192.168.0.26:8080/hit/${prop._id}`, 
        () => method="GET")
        .then((response) => response.json())
        .then((json) => {
            setHits(json)
        })
        .catch((error) => alert(error))
    )

    getHits()

    // const getHitterInfo = (userId) => {
    //     fetch(`http://192.168.0.26:8080/contactId/${prop.userId}`, ()=>method="GET")
    //     .then((response) => response.json())
    //     .then((json) => {return json[0]})
    //   }

    return (
        <View style = {styles.container}>

            <Text style={styles.address}> {prop.address} </Text>
            <Text style={styles.price}>Rent: ${prop.rentPrice}</Text>
            <Text style={styles.hits}>Hits: {prop.numHits}</Text>
            <Text style={styles.hitsList}>Hits List:</Text>

            <ScrollView>
                {hits.map(hit => (
                <TouchableOpacity key={hit._id} onPress={() => navigation.navigate('HitterInfo', {hitterId: hit.userId})}>
                    <View style = {styles.card}>
                        <Text style={styles.name}> {hit.userId} </Text>
                        <Text style={styles.date}>{hit.posted_date}</Text>
                    </View>
                </TouchableOpacity>
                ))}
            </ScrollView>
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
        margin:10,
        fontSize:20
    },
    card:{
        borderRadius:10,
        margin:20,
        backgroundColor:'#C7E9FF',
    },
    name:{
        margin:10,
        fontSize:18
    },
    date:{
        margin:10,
        fontSize:15
    },
    description:{
        margin:10,
        fontSize:15
    }
})