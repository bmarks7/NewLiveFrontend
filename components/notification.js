import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default function Noti({text}){
    return (
        <View>
            <Text style={styles.noti}> {text} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    noti:{
        color:'red',
        marginTop:10,
        marginBottom:10,
        textAlign:'center'
    }
})