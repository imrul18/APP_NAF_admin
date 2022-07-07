import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CompanyService from '../../../../../services/CompanyService';

const GetCompany = ({navigation, route}) => {
  const [tab, setTab] = useState('users');

  const [data, setData] = useState();

  const [users, setUsers] = useState();
  const [contracts, setContracts] = useState();
  const [machines, setMachines] = useState();

  const [loading, setLoading] = useState(true);

  const getCompany = async id => {
    setData(await CompanyService.get(id));
    setLoading(false);
  };

  const getUsers = async id => {
    setUsers(await CompanyService.getUsers(id));
  };

  const getMachines = async id => {
    setMachines(await CompanyService.getMachines(id));
  };

  useEffect(() => {
    let id = route.params.data.id;
    getCompany(id);
    getUsers(id);
    getMachines(id);
  }, []);

  useEffect(() => {
    setContracts(data?.contracts);
  }, [data]);

  const UsersList = item => {
    return (
      <View style={{...styles.card, padding: 10, flexDirection: 'row'}}>
        <Image
          source={{uri: item?.item?.avatar}}
          style={{height: 60, width: 60}}
        />
        <View style={{...styles.cardtitle, paddingLeft: 10}}>
          <Text>Name</Text>
          <Text>Email</Text>
          <Text>Status</Text>
        </View>
        <View>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
        </View>
        <View style={styles.carddetails}>
          <Text>{item?.item?.name}</Text>
          <Text>{item?.item?.email}</Text>
          <Text>{item?.item?.status ? 'Active' : 'Inactive'}</Text>
        </View>
      </View>
    );
  };

  const ContractsList = item => {
    return (
      <View style={{...styles.card, padding: 10, flexDirection: 'row'}}>
        <View style={{...styles.cardtitle, paddingLeft: 10}}>
          <Text>Machine</Text>
          <Text>Machine Models</Text>
          <Text>Expiration Date</Text>
          <Text>Status</Text>
        </View>
        <View>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
        </View>
        <View style={styles.carddetails}>
          <Text>
            {item?.item?.machine_models?.map(it => it?.model?.machine?.name)}
          </Text>
          <Text>{item?.item?.machine_models?.map(it => it?.model?.name)}</Text>
          <Text>{moment(item?.item?.end_date).format('YYYY-MM-DD')}</Text>
          <Text>{item?.item?.status ? 'Active' : 'Inactive'}</Text>
        </View>
      </View>
    );
  };

  const MachinesList = item => {
    return (
      <View style={{...styles.card, padding: 10, flexDirection: 'row'}}>
        <View style={{...styles.cardtitle, paddingLeft: 10}}>
          <Text>Machine</Text>
          <Text>Machine Models</Text>
          <Text>MFG Number</Text>
        </View>
        <View>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
        </View>
        <View style={styles.carddetails}>
          <Text>{item?.item?.machine?.name}</Text>
          <Text>{item?.item?.machine_model?.name}</Text>
          <Text>{item?.item?.mfg_number}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{padding: 10, marginHorizontal: 5, flexDirection: 'row'}}
        onPress={() => {
          navigation.navigate('AllCompanies');
        }}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={{marginHorizontal: 5, fontSize: 18}}>Cpmpany Details</Text>
      </TouchableOpacity>

      <View
        style={{...styles.card, alignItems: 'center', flexDirection: 'row'}}>
        <Image style={styles.image} source={{uri: data?.logo}} />
        <View style={styles.cardtitle}>
          <Text>Name</Text>
          <Text>Due Amount</Text>
          <Text>Trade Limit</Text>
        </View>
        <View>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
        </View>
        <View style={styles.carddetails}>
          <Text>{data?.name}</Text>
          <Text>{data?.due_amount}</Text>
          <Text>{data?.trade_limit}</Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={styles.button}
            onPress={() => {
              setTab('users');
            }}>
            Users
          </Text>
          <Text
            style={styles.button}
            onPress={() => {
              setTab('contracts');
            }}>
            Contracts
          </Text>
          <Text
            style={styles.button}
            onPress={() => {
              setTab('machines');
            }}>
            Machines
          </Text>
        </View>
        <Text style={{fontSize: 24, fontWeight: '700', margin: 5}}>{tab}</Text>
      </View>

      {tab == 'users' && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={users}
          renderItem={UsersList}
          keyExtractor={item => item?.id}
        />
      )}

      {tab == 'contracts' && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={contracts}
          renderItem={ContractsList}
          keyExtractor={item => item?.id}
        />
      )}

      {tab == 'machines' && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={machines}
          renderItem={MachinesList}
          keyExtractor={item => item?.id}
        />
      )}

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

  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  cardtitle: {
    paddingRight: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  carddetails: {
    paddingLeft: 10,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },

  machineCard: {
    margin: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
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

  button: {
    backgroundColor: '#2196F3',
    padding: 5,
    margin: 5,
    marginBottom: 0,
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GetCompany;
