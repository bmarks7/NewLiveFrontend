import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default function Header({text}){
    return (
        <View style={styles.header}>
            <Text style={styles.title}> {text} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        height:50,
        paddingTop:10,
        backgroundColor:'aqua'
    },
    title:{
        textTransform:'uppercase',
        textAlign:'center',
        fontSize:30,
        fontWeight:'bold'
    }
})
