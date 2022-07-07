import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { useDispatch } from "react-redux";
import DesignationService from "../../../../../services/DesignationService";
import EmployeeService from "../../../../../services/EmployeeService";
import RoleService from "../../../../../services/RoleService";

const windowWidth = Dimensions.get('window').width;

const AddEmployee = ({ navigation }) => {
    const dispatch = useDispatch();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        designation_id: null,
        role: null,
    });

    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState([]);
    const getRoles = async () => {
        let data = await RoleService.getAll();
        var role = data.map((itm) => (itm.id));
        setRoles(role);
        var seletedrole = data.map((itm) => (itm.name));
        setSelectedRole(seletedrole);
    };

    const [designations, setDesignations] = useState([]);
    const [selectedDesignations, setSelectedDesignations] = useState([]);
    const getDesignations = async () => {
        let data = await DesignationService.getAll();
        var role = data.map((itm) => (itm.id));
        setDesignations(role);
        var seletedrole = data.map((itm) => (itm.name));
        setSelectedDesignations(seletedrole);
    };

    useEffect(() => {
        getDesignations();
        getRoles();
    }, []);


    const createEmployee = async () => {
        await EmployeeService.create(data);
        navigation.navigate('AllEmployees')
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
            <Text style={styles.heading}>ADD EMPLOYEE</Text>
            <View style={styles.input}>
                <TextInput style={styles.inputtxt} placeholder="Name" onChangeText={(value) => { handleChange(value, "name") }} />
                <TextInput style={styles.inputtxt} placeholder="email" onChangeText={(value) => { handleChange(value, "email") }} />
                <TextInput style={styles.inputtxt} placeholder="password" onChangeText={(value) => { handleChange(value, "password") }} secureTextEntry={true} />

                <View style={styles.select}>
                    <Text style={styles.inputselecttxt}>Designation</Text>
                    <SelectDropdown
                        buttonTextStyle={styles.inputselect}
                        data={selectedDesignations}
                        placeholder="Designation"
                        onSelect={(selectedItem, index) => {
                            handleChange(designations[index], "designation_id")
                        }}
                    />
                </View>
                <View style={styles.select}>
                    <Text style={styles.inputselecttxt}>Role</Text>
                    <SelectDropdown
                        buttonTextStyle={styles.inputselect}
                        data={selectedRole}
                        placeholder="Role"
                        onSelect={(selectedItem, index) => {
                            handleChange(roles[index], "role")
                        }}
                    />
                </View>
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
                    onPress={() => navigation.navigate('AllEmployees')}
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
    button:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsave:{
        width: windowWidth*0.5,
        backgroundColor: "#2196F3",
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        margin: 10
    },
    buttonback:{
        backgroundColor: "#2196F3",
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 60
    },
    textStyle:{
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16
    }
})

export default AddEmployee