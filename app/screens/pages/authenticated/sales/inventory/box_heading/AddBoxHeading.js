import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown'
import { useIsFocused } from "@react-navigation/native";
import PartHeadingService from "../../../../../services/PartHeadingService";
import BoxHeadingService from "../../../../../services/BoxHeadingService";


const windowWidth = Dimensions.get('window').width;

const AddBoxHeading = ({ navigation }) => {
    const isFocused = useIsFocused();

    const [data, setData] = useState({
        name: "",
        description: "",
        extended: false
    });

    const [selectedName, setSelectedName] = useState([]);
    const getNames = async () => {
        let data = await PartHeadingService.getAll();
        var seleteddata = data.map((itm) => (itm.name));
        setSelectedName(seleteddata);
    };

    const createBoxHeading = async () => {
        await BoxHeadingService.create(data);
        navigation.navigate("AllBoxHeadings")
    };


    const handleChange = (value, name) => {
        const cvalue = value;
        const cname = name;

        setData({
            ...data,
            [cname]: cvalue,
        });
    };

    useEffect(()=>{
        if(isFocused)
        getNames()
    },[isFocused])

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>ADD BoxHeading</Text>
            <View style={styles.input}>
            <View style={styles.select}>
                    <Text style={styles.inputselecttxt}>Name:</Text>
                    <SelectDropdown
                        buttonTextStyle={styles.inputselect}
                        data={selectedName}
                        placeholder="Designation"
                        onSelect={(selectedItem, index) => {
                            handleChange(selectedItem, "name")
                        }}
                    />
                </View>
                <View style={styles.extendedbox}>
                    <CheckBox
                        value={data.extended}
                        onValueChange={(value) => { handleChange(value, "extended") }}
                    />
                    <Text>Extended Box</Text>
                </View>
                <TextInput
                    multiline
                    numberOfLines={4}
                    style={styles.inputdecs} placeholder="description" onChangeText={(value) => { handleChange(value, "description") }} />
            </View>
            <View style={styles.button}>

                <TouchableOpacity
                    style={styles.buttonsave}
                    onPress={() => createBoxHeading()}
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
        justifyContent: 'center',
    },
    input: {
        flex: 2,
        alignItems: 'center',
        margin: 20,
    },
    inputtxt: {
        width: windowWidth * 0.7,
        height: 50,
        margin: 5,
        borderWidth: 2,
        borderRadius: 10,
        textAlign: 'center',
    },
    inputdecs: {
        width: windowWidth * 0.7,
        height: 200,
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
    extendedbox:{
        flex:1,
        flexDirection: "row", 
        alignItems:'center'
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
        marginTop: 80
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16
    }
})

export default AddBoxHeading