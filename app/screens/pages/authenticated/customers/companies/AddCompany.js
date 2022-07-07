import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import Tags from "react-native-tags";
import CompanyService from "../../../../../services/CompanyService";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddCompany = ({ navigation }) => {
    const [data, setData] = useState({
        name: '',
        company_group: '',
        machine_types: '',
        description: '',
    });


    const createEmployee = async () => {
        await CompanyService.create(data);
        navigation.navigate("AllCompanies")
    };


    const handleChange = (value, name) => {
        const cvalue = value;
        const cname = name;

        setData({
            ...data,
            [cname]: cvalue,
        });
    };


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>ADD COMPANY</Text>
            <View style={styles.input}>
                <TextInput style={styles.inputtxt} placeholder="Company Name" onChangeText={(value) => { handleChange(value, "name") }} />
                <TextInput style={styles.inputtxt} placeholder="Group of Company" onChangeText={(value) => { handleChange(value, "company_group") }} />
                <Tags
                    initialText="Factory Type"
                    onChangeTags={(tags) => handleChange(tags.toString(), "machine_types")}
                    containerStyle={styles.containerStyle}
                    inputStyle={styles.inputStyle}
                    renderTag={({ tag, index, onPress }) => (
                        <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
                            <Text style={styles.inputdataStyle}>{tag} </Text>
                        </TouchableOpacity>
                    )}
                />

                <TextInput
                    multiline
                    numberOfLines={4}
                    style={styles.inputdecs} placeholder="Description" onChangeText={(value) => { handleChange(value, "description") }} />

            </View>
            <View style={styles.button}>

                <TouchableOpacity
                    style={styles.buttonsave}
                    onPress={() => createEmployee()}
                >
                    <Text style={styles.textStyle}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonback}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.textStyle}>Back</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef',
    },
    heading: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: "700",
        padding: 20,
        justifyContent: 'center'
    },
    input: {
        alignItems: 'center',
        margin: 40,
    },
    inputtxt: {
        width: windowWidth * 0.7,
        height: 50,
        margin: 5,
        borderWidth: 2,
        borderRadius: 10,
        textAlign: 'center',
    },
    select: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingHorizontal: 40
    },
    inputselecttxt: {
        marginVertical: 15,
        width: 80
    },
    inputselect: {
        width: windowWidth * 0.7,
        padding: 5,
        margin: 5,
        borderWidth: 2,
        borderRadius: 10,
        textAlign: 'center',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsave: {
        width: windowWidth * 0.5,
        backgroundColor: "#2196F3",
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        margin: 10
    },
    buttonback: {
        backgroundColor: "#2196F3",
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16
    },
    containerStyle: {
        alignItems: 'center',
        width: windowWidth * 0.7,
        borderWidth: 2,
        borderRadius: 10,
        padding: 5
    },
    inputStyle: {
        borderRadius: 10,
        backgroundColor: "white"
    },
    inputdataStyle: {
        borderRadius: 2,
        padding: 1,
        margin: 1,
        backgroundColor: "white"
    },
    inputdecs: {
        width: windowWidth * 0.7,
        height: 100,
        margin: 5,
        borderWidth: 2,
        borderRadius: 10,
        textAlign: 'center',
    }
})

export default AddCompany