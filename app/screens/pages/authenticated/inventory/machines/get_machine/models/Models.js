import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, TextInput,ScrollView} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from "@react-navigation/native";
import MachineModelService from "../../../../../../services/MachineModelService";
import Modal from "react-native-modal";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Model = ({ route, navigation }) => {

    const data = route?.params?.models

    const [modalVisivility, setModalVisivility] = useState(false)
    const [modaldata, setModaldata] = useState()
    const [modaltype, setModaltype] = useState()

    const [updateData, setUpdateData] = useState({})

    const deleteModel = async (id, modelId) => {
        await MachineModelService.remove(id, modelId);
    };

    const updateMachine = async (machineId, modelId, data) => {
        await MachineModelService.update(machineId, modelId, data);
    };

    const submitModal = async() => {
        if(modaltype==="Update Model") await MachineModelService.update(modaldata.machine_id, modaldata.id, updateData);
    }

    const [name, setName]=useState()
    const [space, setSpace]=useState()
    const [decs, setDecs]=useState()
    const EditModal = () => {
        console.log(modaldata);        
        
        return (
            <Modal isVisible={modalVisivility} style={styles.modalcontainer}>
                <View>
                    <TextInput style={styles.inputstyle} onChangeText={setName}>{modaldata?.name}</TextInput>
                    <TextInput style={styles.inputstyle} onChangeText={setSpace}>{modaldata?.space}</TextInput>
                    <TextInput style={styles.decsinputstyle}
                        multiline
                        numberOfLines={4}
                        value={modaldata?.description}
                        onChangeText={setDecs}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => setModalVisivility(false)}>
                        <Text style={styles.btn}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleinput("a","submit")}>
                        <Text style={{ ...styles.btn, backgroundColor: 'green' }}>{modaltype}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
    const ModelList = ({ item }) => {
        return (
            <>
                <View style={styles.listcontainer}>
                    <Text style={styles.dataname}>{item.name}</Text>

                    <Text style={styles.datastatus}>{item.space}</Text>
                    <View style={styles.dataaction}>
                        <TouchableOpacity onPress={() => { setModalVisivility(true); setModaldata(item); setModaltype("Update Model") }}>
                            <MaterialIcons name='edit' size={22} color='black' />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialIcons name='delete-outline' size={22} color='red' onPress={() => {
                                deleteModel(item.machine_id, item.id);
                            }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>MODELS</Text>
            <View style={styles.addemployee}>
                <TouchableOpacity
                    style={styles.buttonback}
                    onPress={() => { setModalVisivility(true); setModaldata(); setModaltype("Add Model") }}
                >
                    <Text style={styles.textStyle}>Add Models</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.showemployee}>
                <View style={styles.listcontainer}>
                    <Text style={styles.listname}>Name</Text>
                    <Text style={styles.liststatus}>Space</Text>
                    <Text style={styles.listaction}>Action</Text>
                </View>
                {/* {loading && <Text style={styles.loading}>Loading...</Text>} */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={ModelList}
                    keyExtractor={item => item.id}
                />
            </View>
            <EditModal />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2c98a',
        height: windowHeight
    },
    heading: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: "700",
        padding: 20,
        justifyContent: 'center'
    },
    route: {
        padding: 6,
        color: 'red',
        borderColor: 'black',
        borderBottomWidth: 2,
    },
    showemployee: {
        flex: 5,
    },
    listcontainer: {
        flexDirection: 'row',
        margin: 5,
        marginHorizontal: 20,
    },
    listname: {
        fontSize: 20,
        textAlign: 'center',
        width: windowWidth * 0.3,
        fontWeight: '700',
    },
    liststatus: {
        fontSize: 20,
        textAlign: 'center',
        width: windowWidth * 0.3,
        fontWeight: '700',
    },
    listaction: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        width: windowWidth * 0.2,
    },
    dataname: {
        fontSize: 16,
        textAlign: 'center',
        width: windowWidth * 0.3,
    },
    datastatus: {
        fontSize: 16,
        textAlign: 'center',
        width: windowWidth * 0.3,
    },
    dataaction: {
        paddingLeft: 20,
        flex: 1,
        fontSize: 16,
        width: windowWidth * 0.2,
        flexDirection: 'row',
    },
    addemployee: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    loading: {
        alignSelf: 'center',
        fontSize: 20,
    },
    modalcontainer: {
        backgroundColor: "white",
        alignItems: 'center',
        flex: 1,
        maxHeight: windowHeight * 0.5,
        marginTop: windowHeight * 0.15,
        width: windowWidth * 0.8,
        marginHorizontal: windowWidth * 0.1,
    },
    inputstyle: {
        borderWidth: 2,
        width: windowWidth * 0.5,
        height: 40,
        borderRadius: 10,
        margin: 10,
        textAlign: 'center'
    },
    decsinputstyle: {
        borderWidth: 2,
        width: windowWidth * 0.5,
        borderRadius: 10,
        margin: 10,
    },
    btn: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        margin: 5,
        color: 'white',
        fontSize: 20,
        fontWeight: '600'
    }
})
export default Model