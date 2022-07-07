import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import SelectDropdown from 'react-native-select-dropdown'
import DesignationService from "../../../../../services/DesignationService";
import RoleService from "../../../../../services/RoleService";
import EmployeeService from "../../../../../services/EmployeeService";

const windowWidth = Dimensions.get('window').width;

const EditEmployee = ({ navigation, route }) => {
    const data = route.params.data

    var activestatus = false
    if (data.status == 1) activestatus = true

    const [activeStatus, setActiveStatus] = useState(activestatus)

    const [updatedata, setUpdateData] = useState({name: data.name})


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

    let roleindex = selectedRole.indexOf(route.params.data.role)
    let designationindex = selectedDesignations.indexOf(route.params.data.designation)

    useEffect(() => {
        getDesignations();
        getRoles();
    }, []);


    const updateEmployee = async () => {
        if (activeStatus) await EmployeeService.update(data.id, {...updatedata, status: activeStatus});
        else await EmployeeService.update(data.id,updatedata);
        navigation.navigate("AllEmployees")
    };

    const handleChange = (value, name) => {
        let cvalue = value;
        let cname = name;

        setUpdateData({
            ...updatedata,
            [cname]: cvalue,
        });
    };


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>EDIT EMPLOYEE</Text>
            <View style={styles.input}>
                <TextInput style={styles.inputtxt} value={updatedata?.name ? updatedata.name : data.name} onChangeText={(value) => { handleChange(value, "name") }} />
                <TextInput style={styles.inputtxt} value={updatedata?.email ? updatedata.email : data.email} onChangeText={(value) => { handleChange(value, "email") }} />
                <TextInput style={styles.inputtxt} placeholder="Password" onChangeText={(value) => { handleChange(value, "password") }} secureTextEntry={true} />

                <View style={styles.select}>
                    <Text style={styles.inputselecttxt}>Designation</Text>
                    <SelectDropdown
                        buttonTextStyle={styles.inputselect}
                        defaultValueByIndex={designationindex}
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
                        defaultValueByIndex={roleindex}
                        data={selectedRole}
                        placeholder="Role"
                        onSelect={(selectedItem, index) => {
                            handleChange(roles[index], "role")
                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.inputselecttxt}>Active</Text>
                    <CheckBox
                        value={activeStatus}
                        onValueChange={(newValue) => { setActiveStatus(!activeStatus) }}
                    />
                </View>
            </View>
            <View style={styles.button}>

                <TouchableOpacity
                    style={styles.buttonsave}
                    onPress={() => updateEmployee()}
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
        marginTop: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16
    }
})

export default EditEmployee