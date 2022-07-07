import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from "@react-navigation/native";
import CheckBox from '@react-native-community/checkbox';
import RoleService from "../../../../../services/RoleService";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GetRole = ({ route, navigation }) => {

    const data = route.params.data

    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState({});
    const [permissions, setPermissions] = useState([]);
    const [defaultPerms, setDefaultPerms] = useState(null);


    const getRole = async () => {
        setRole(await RoleService.get(data.id));
        
    };

    const getPermission = async () => {
        setPermissions(await RoleService.getPermission());
        setLoading(false)
    };

    const updatePermission = async (permId, attach) => {
        await RoleService.updatePermission(data.id, permId, attach);
        getRole();
    };

    useEffect(() => {
        if (role.permissions)
            setDefaultPerms(role.permissions?.map((perm) => perm.id));
    }, [role]);

    useEffect(() => {
        getRole(data.id);
        getPermission();
    }, []);


    useEffect(() => {
        if (isFocused) {
            getRole(data.id);
            getPermission();
        }
    }, [isFocused])

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.heading}>{role?.name}</Text>
            </View>

            <View style={styles.activity}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {permissions?.map((item, index) => {
                        return (
                            <View style={styles.activityfield} key={index}>
                                <Text style={styles.fieldheading}>{item.name}</Text>
                                <View>
                                    {
                                        item.permissions.map((item, index) => {
                                            return (
                                                <View style={styles.permission} key={index}>
                                                    <CheckBox
                                                        value={defaultPerms?.includes(item.id)}
                                                        onValueChange={(value) => { updatePermission(item.id, value) }}
                                                    />
                                                    <Text>{item.name.split("_").join(" ")}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        )
                    })
                    }
                </ScrollView>
            </View>
            <View style={styles.back}>
                <TouchableOpacity
                    style={styles.buttonback}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.textStyle}>Back</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={loading}
            >
                <View style={styles.loginModalVIew}>
                    <ActivityIndicator size="large" color="red" />
                    <Text>Please Wait...</Text>
                </View>


            </Modal>
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
    title: {
        flex: 1,
        justifyContent: 'center'
    },
    heading: {
        fontSize: 24,
        fontWeight: "800",
    },
    activity: {
        flex: 12,
    },
    fieldheading: {
        fontSize: 20,
        fontWeight: "700",
        alignSelf: 'center',
        padding: 10,
    },
    permission: {
        flexDirection: 'row',
        paddingHorizontal: windowWidth * 0.25,
        alignItems: 'center'
    },
    back: {
        flex: 2,
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
    loginModalVIew: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginHorizontal: 100,
        marginVertical: 300,
        borderRadius: 20
    }
})


export default GetRole