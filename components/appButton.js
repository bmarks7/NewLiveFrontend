import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

export default function AppButton({text, onPress}) {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        borderRadius:10,
        paddingVertical:8,
        paddingHorizontal:8,
        backgroundColor:'aqua',
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
        margin:10,
        //width:150
        
    },
    buttonText:{
        fontWeight:'bold',
        fontSize:20,
        textAlign:'center',
        textTransform:'uppercase'
    }
})
