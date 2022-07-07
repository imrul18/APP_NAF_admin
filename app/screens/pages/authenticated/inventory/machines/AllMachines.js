import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import MachineService from '../../../../../services/MachineService';

const windowWidth = Dimensions.get('window').width;

const AllMachines = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState();

  const [machine, setMachine] = useState([]);

  const getmachine = async params => {
    setMachine(await MachineService.getAll(params));
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      getmachine();
    }
  }, [isFocused]);

  const deletemachine = async id => {
    await MachineService.remove(id);
    getmachine();
  };

  const MachineList = ({item}) => {
    return (
      <>
        <View style={styles.listcontainer}>
          <Text style={styles.dataname}>{item.name}</Text>

          <Text style={styles.datastatus}>{item.models_count}</Text>
          <View style={styles.dataaction}>
            <TouchableOpacity
              onPress={() => navigation.navigate('GetMachine', {data: item})}>
              <Ionicons name="eye" size={22} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditMachine', {data: item})}>
              <MaterialIcons name="edit" size={22} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons
                name="delete-outline"
                size={22}
                color="red"
                onPress={() => {
                  setConfirmDelete(true);
                  setDeleteItem(item);
                }}
              />
            </TouchableOpacity>
            {item.id == deleteItem?.id && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={confirmDelete}>
                <View style={styles.loginModalView}>
                  <View>
                    <Text style={styles.deleteModalmsg}>
                      Are you sure you want to delete{' '}
                      <Text style={{color: '#FF6347'}}>
                        {' '}
                        {deleteItem?.name}
                      </Text>
                      ?
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={styles.deleteModaltext}
                      onPress={() => {
                        setConfirmDelete(false);
                      }}>
                      No
                    </Text>
                    <Text
                      style={styles.deleteModaltext}
                      onPress={() => {
                        deletemachine(deleteItem?.id);
                        setConfirmDelete(false);
                      }}>
                      Yes
                    </Text>
                  </View>
                </View>
              </Modal>
            )}
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ALL MACHINE</Text>
      <View style={styles.showemployee}>
        <View style={styles.listcontainer}>
          <Text style={styles.listname}>Name</Text>
          <Text style={styles.liststatus}>Models</Text>
          <Text style={styles.listaction}>Action</Text>
        </View>
        <Modal animationType="slide" transparent={true} visible={loading}>
          <View style={styles.loginModalView}>
            <ActivityIndicator size="large" color="red" />
            <Text>Please Wait...</Text>
          </View>
        </Modal>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={machine.data}
          renderItem={MachineList}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.addemployee}>
        <TouchableOpacity
          style={styles.buttonback}
          onPress={() => navigation.navigate('AddMachine')}>
          <Text style={styles.textStyle}>Add Machine</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  heading: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '700',
    padding: 20,
    justifyContent: 'center',
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
    backgroundColor: '#2196F3',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  loginModalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 100,
    marginVertical: 300,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#7f7f7f',
  },
  deleteModalmsg: {
    textAlign: 'center',
  },
  deleteModaltext: {
    marginHorizontal: 20,
    margin: 10,
    padding: 5,
    width: 50,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    textAlign: 'center',
    color: 'white',
  },
});
export default AllMachines;
