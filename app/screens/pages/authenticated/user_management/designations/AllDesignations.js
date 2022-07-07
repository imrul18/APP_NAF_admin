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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import RNExitApp from 'react-native-exit-app';
import {useSelector} from 'react-redux';
import DesignationService from '../../../../../services/DesignationService';

const windowWidth = Dimensions.get('window').width;

const AllDesignations = ({navigation}) => {
  const isFocused = useIsFocused();
  const {user} = useSelector(state => state.authStore);

  const [loading, setLoading] = useState(true);  
  const [designations, setDesignations] = useState([]);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState();

  const getDesignations = async params => {
    setDesignations(await DesignationService.getAll(params));
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      getDesignations();
    }
  }, [isFocused]);

  const deleteDesignations = async id => {
    await DesignationService.remove(id);
    getDesignations();
  };

  const DesignationList = ({item}) => {
    return (
      <>
        <View style={styles.listcontainer}>
          <Text style={styles.dataname}>{item.name}</Text>

          <Text style={styles.datastatus}>{item.members}</Text>
          <View style={styles.dataaction}>
            {(user?.role === 'Admin' ||
              user?.permissions.includes('designations_show')) && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('GetDesignation', {data: item})
                }>
                <Ionicons name="eye" size={22} color="black" />
              </TouchableOpacity>
            )}
            {(user?.role === 'Admin' ||
              user?.permissions.includes('designations_edit')) && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditDesignation', {data: item})
                }>
                <MaterialIcons name="edit" size={22} color="black" />
              </TouchableOpacity>
            )}
            {(user?.role === 'Admin' ||
              user?.permissions.includes('designations_delete')) && (
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
                      Are you sure you want to delete
                      <Text style={{color: '#FF6347'}}>
                        {' '}
                        {deleteItem?.name}{' '}
                      </Text>
                      designation?
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
                        deleteDesignations(deleteItem.id);
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
      <Text style={styles.heading}>ALL DESIGNATIONS</Text>
      <View style={styles.showemployee}>
        <View style={styles.listcontainer}>
          <Text style={styles.listname}>Name</Text>
          <Text style={styles.liststatus}>Members</Text>
          <Text style={styles.listaction}>Action</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={designations}
          renderItem={DesignationList}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.addemployee}>
        {(user?.role === 'Admin' ||
          user?.permissions.includes('designations_create')) && (
          <TouchableOpacity
            style={styles.buttonback}
            onPress={() => navigation.navigate('AddDesignation')}>
            <Text style={styles.textStyle}>Add Designation</Text>
          </TouchableOpacity>
        )}
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
  loading: {
    alignSelf: 'center',
    fontSize: 20,
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
export default AllDesignations;
