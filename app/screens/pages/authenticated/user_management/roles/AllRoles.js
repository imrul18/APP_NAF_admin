import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import RoleService from '../../../../../services/RoleService';

const windowWidth = Dimensions.get('window').width;

const AllRoles = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState();

  const isFocused = useIsFocused();

  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    setRoles(await RoleService.getAll());
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      getRoles();
    }
  }, [isFocused]);

  const deletRoles = async roleId => {
    await RoleService.remove(roleId);
    getRoles();
  };

  const RoleList = ({item}) => {
    return (
      <>
        <View style={styles.listcontainer}>
          <Text style={styles.dataname}>{item.name}</Text>

          <Text style={styles.datastatus}>{item.users_count}</Text>
          <View style={styles.dataaction}>
            {item.name != 'Admin' && (
              <TouchableOpacity>
                <Ionicons
                  name="eye"
                  size={22}
                  color="black"
                  onPress={() => {
                    navigation.navigate('GetRole', {data: item});
                  }}
                />
              </TouchableOpacity>
            )}
            {item.name != 'Admin' && item.users_count <= 0 && (
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
                    <Text>
                      Are you sure you want to delete
                      <Text style={{color: '#FF6347'}}>
                        {' '}
                        {deleteItem?.name}{' '}
                      </Text>{' '}
                      role?
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
                        deletRoles(deleteItem.id);
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
      <Text style={styles.heading}>ALL Roles</Text>
      <View style={styles.showemployee}>
        <View style={styles.listcontainer}>
          <Text style={styles.listname}>Name</Text>
          <Text style={styles.liststatus}>Members</Text>
          <Text style={styles.listaction}>Action</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={roles}
          renderItem={RoleList}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.addemployee}>
        <TouchableOpacity
          style={styles.buttonback}
          onPress={() => navigation.navigate('AddRole')}>
          <Text style={styles.textStyle}>Add Roles</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={loading}>
        <View style={styles.loginModalView}>
          <ActivityIndicator size="large" color="red" />
          <Text>Please Wait...</Text>
        </View>
      </Modal>
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
export default AllRoles;
