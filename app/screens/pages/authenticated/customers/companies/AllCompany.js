import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import CompanyService from '../../../../../services/CompanyService';
import {useSelector} from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AllCompany = ({navigation}) => {
  const {user} = useSelector(state => state.authStore);

  const [loading, setLoading] = useState(true);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState();

  const [search, setSearch] = useState('');

  const isFocused = useIsFocused();

  const [employees, setEmployees] = useState([]);

  var allemployees = employees.data;

  if (search == '') {
    allemployees = employees.data;
  } else {
    var allemployees = allemployees.filter(data => {
      return data.name.substr(0, search.length) === search;
    });
  }

  const getEmployees = async () => {
    setEmployees(await CompanyService.getAll());
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      getEmployees();
    }
  }, [isFocused]);

  const deleteCompany = async id => {
    await CompanyService.remove(id);
    getEmployees();
  };

  const EmployeeList = ({item}) => {
    return (
      <>
        <View style={styles.listcontainer}>
          <Text style={styles.dataname}>{item.name}</Text>
          <Text style={styles.datastatus}>
            {item.status == 1 ? 'Active' : 'Inactive'}
          </Text>
          <View style={styles.dataaction}>
            {(user?.role === 'Admin' ||
              user?.permissions.includes('companies_show')) && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('GetCompany', {data: item})
                }>
                <Ionicons name="eye" size={22} color="black" />
              </TouchableOpacity>
            )}
            {(user?.role === 'Admin' ||
              user?.permissions.includes('companies_edit')) && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditCompany', {data: item})
                }>
                <MaterialIcons name="edit" size={22} color="black" />
              </TouchableOpacity>
            )}
            {(user?.role === 'Admin' ||
              user?.permissions.includes('companies_delete')) && (
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
                      <Text style={{color: '#FF6347'}}>{deleteItem?.name}</Text>{' '}
                      company?
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
                        deleteCompany(deleteItem?.id);
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
      <View style={styles.searchbox}>
        <TextInput
          onChangeText={setSearch}
          style={styles.searchtext}
          placeholder="Search"
        />
      </View>
      <Text style={styles.heading}>ALL COMPANIES</Text>
      <View style={styles.showemployee}>
        <View style={styles.listcontainer}>
          <Text style={styles.listname}>Name</Text>
          <Text style={styles.liststatus}>Contract Status</Text>
          <Text style={styles.listaction}>Action</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={allemployees}
          renderItem={EmployeeList}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.addemployee}>
        {(user?.role === 'Admin' ||
          user?.permissions.includes('companies_create')) && (
          <TouchableOpacity
            style={styles.buttonback}
            onPress={() => navigation.navigate('AddCompany')}>
            <Text style={styles.textStyle}>Add company</Text>
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
  searchbox: {
    borderRadius: 20,
    borderWidth: 2,
    margin: 10,
    marginHorizontal: 50,
  },
  searchtext: {
    textAlign: 'center',
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
    height: windowHeight * 0.6,
  },
  listcontainer: {
    flexDirection: 'row',
    margin: 5,
    marginHorizontal: 20,
    alignItems: 'center',
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
export default AllCompany;
