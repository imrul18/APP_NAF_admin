import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList, Modal, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useIsFocused } from "@react-navigation/native";
import DesignationService from "../../../../../services/DesignationService";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const GetDesignation = ({ route, navigation }) => {

    const data = route.params.data
    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(true)

    const [designation, setDesignation] = useState({});
    const getDesignation = async () => {
        setDesignation(await DesignationService.get(data.id));
        setLoading(false)
    };

    useEffect(() => {
        if (isFocused) {
            getDesignation();
        }
    }, [isFocused])


    const ShowEmployees = ({ item }) => {
        return (
            <View style={styles.activitycontainer}>
                <View style={styles.image}>
                    <Image style={styles.showimage} source={{
                        uri: item.avatar,
                    }} />
                </View>
                <View style={styles.message}>
                    <Text style={styles.Textdetails}>{item.name}</Text>
                    <Text style={styles.Textdetails}>{item.email}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>

            <View style={styles.details}>
                <Text style={styles.Textname}>Name: {data.name}</Text>
                <Text style={styles.Text}>ID: {data.id}</Text>
                <Text style={styles.Text}>Created at {data.created_at}</Text>
                <Text style={styles.Text}>Updated at {data.updated_at}</Text>
                <Text style={styles.Text}>Description:</Text>
                {data?.description && <Text style={styles.Textdecs}>{data.description}</Text>}
            </View>
            <View style={styles.activity}>
                <Text style={styles.activityheading}>Employee List</Text>
                {loading ? (
          <Modal animationType="slide" transparent={true} visible={true}>
            <View style={styles.loadingModalView}>
              <ActivityIndicator size="large" color="red" />
            </View>
          </Modal>
        ) : designation.employees.length ? (
            <FlatList
            data={designation.employees}
            renderItem={ShowEmployees}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
        />
        ) : (
          <View style={styles.activitycontainer}>
            <View style={styles.details}>
              <Text
                style={{
                  ...styles.Textdetails,
                  paddingTop: 100,
                  color: '#FF6347',
                }}>
                Empty Member
              </Text>
            </View>
          </View>
        )}
                
            </View>
            <View style={styles.back}>
                <TouchableOpacity
                    style={styles.buttonback}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.textStyle}>Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#efefef',
    },
    image: {
        alignItems: 'center',
        padding: 5,
    },
    showimage: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    details: {
        flex: 3,
        alignItems: 'center',
        padding: 5,
    },
    activity: {
        flex: 7
    },
    back: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    buttonback: {
        backgroundColor: "#2196F3",
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16
    },
    Textname: {
        fontSize: 20,
        fontWeight: '700'
    },
    Text: {
        fontSize: 16,
    },
    Textdecs: {
        fontSize: 16,
        height: 80,
        textAlign: "justify"
    },
    activitycontainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        margin: 10,
    },

    message: {
        padding: 10
    },
    activityheading: {
        fontSize: 24,
        fontWeight: '800',
        alignSelf: 'center',
    },
    loading:{
        alignSelf:'center',
        fontSize: 20,
    },
    loadingModalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#efefef',
        marginHorizontal: 100,
        marginVertical: 400,
        borderRadius: 20,
      },
})


export default GetDesignation