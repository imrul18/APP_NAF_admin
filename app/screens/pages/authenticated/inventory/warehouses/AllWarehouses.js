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
import RNExitApp from 'react-native-exit-app';
import {useSelector} from 'react-redux';
import WareHouseService from '../../../../../services/WareHouseService';

const windowWidth = Dimensions.get('window').width;

const AllWarehouses = ({navigation}) => {
  const {user} = useSelector(state => state.authStore);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState();

  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  const [warehouses, setwarehouses] = useState([]);

  const getwarehouses = async params => {
    try {
      setwarehouses(await WareHouseService.getAll(params));
      setLoading(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.toString() + '! Try Again',
        position: 'center',
      });
      setTimeout(() => {
        RNExitApp.exitApp();
      }, 3000);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getwarehouses();
    }
  }, [isFocused]);

  const deletewarehouses = async id => {
    await WareHouseService.remove(id);
    getwarehouses();
  };

  const WarehouseList = ({item}) => {
    return (
      <View style={styles.listcontainer}>
        <Text style={styles.dataname}>{item.name}</Text>

        <Text style={styles.datastatus}>{item.parts_count}</Text>
        <View style={styles.dataaction}>
          {(user?.role === 'Admin' ||
            user?.permissions.includes('warehouses_show')) && (
            <TouchableOpacity
              onPress={() => navigation.navigate('GetWarehouse', {data: item})}>
              <Ionicons name="eye" size={22} color="black" />
            </TouchableOpacity>
          )}
          {(user?.role === 'Admin' ||
            user?.permissions.includes('warehouses_edit')) && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditWarehouse', {data: item})
              }>
              <MaterialIcons name="edit" size={22} color="black" />
            </TouchableOpacity>
          )}
          {(user?.role === 'Admin' ||
            user?.permissions.includes('warehouses_delete')) && (
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
          )}
          {item.id == deleteItem?.id && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={confirmDelete}>
              <View style={styles.loginModalView}>
                <View>
                  <Text style={styles.deleteModalmsg}>
                    Are you sure you want to delete{' '}
                    <Text style={{color: '#FF6347'}}> {deleteItem?.name}</Text>?
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
                      deletewarehouses(deleteItem?.id);
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
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ALL WAREHOUSES</Text>
      <View style={styles.showemployee}>
        <View style={styles.listcontainer}>
          <Text style={styles.listname}>Name</Text>
          <Text style={styles.liststatus}>Parts</Text>
          <Text style={styles.listaction}>Action</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={warehouses}
          renderItem={WarehouseList}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.addemployee}>
        <Modal animationType="slide" transparent={true} visible={loading}>
          <View style={styles.loginModalView}>
            <ActivityIndicator size="large" color="red" />
            <Text>Please Wait...</Text>
          </View>
        </Modal>
        {(user?.role === 'Admin' ||
          user?.permissions.includes('warehouses_create')) && (
          <TouchableOpacity
            style={styles.buttonback}
            onPress={() => navigation.navigate('AddWarehouse')}>
            <Text style={styles.textStyle}>Add Warehouse</Text>
          </TouchableOpacity>
        )}
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
    alignContent: 'center',
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
export default AllWarehouses;
