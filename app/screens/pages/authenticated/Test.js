import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground, TextInput, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native'


const Test = ({ navigation, route }) => {

    console.log(route.params);
    return (
        <View style={{flex:1,alignItems:'center', justifyContent:'center', backgroundColor:"#888"}}>
            <Text style={{color:"#fff", fontSize: 28, fontWeight:"700"}}>Under Maintenance</Text>            
        </View>
    )
}


export default Test