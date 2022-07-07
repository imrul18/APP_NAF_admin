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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ContractService from '../../../../../services/ContractService';

const ContractDetails = ({navigation, route}) => {
  const [data, setData] = useState();

  const [loading, setLoading] = useState(true);

  const getContract = async () => {
    setData(await ContractService.get(route.params.data.id));
    setLoading(false);
  };

  useEffect(() => {
    getContract();
  }, []);


  const machineList = item => {
    return (
      <View style={{...styles.card, padding: 10}}>
        <View style={styles.cardtitle}>
          <Text>Name</Text>
          <Text>MFG Number</Text>
          <Text>Space</Text>
        </View>
        <View>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
        </View>
        <View style={styles.carddetails}>
          <Text>{item?.item?.model?.name}</Text>
          <Text>{item?.item?.mfg_number}</Text>
          <Text>{item?.item?.model?.space}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{padding: 10, marginHorizontal: 5, flexDirection: 'row'}}
        onPress={() => {
          navigation.navigate('AllContracts');
        }}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={{marginHorizontal: 5, fontSize: 18}}>
          Contract Details
        </Text>
      </TouchableOpacity>
      <View style={styles.card}>
        <View style={styles.cardtitle}>
          <Text>{data?.is_foc ? 'Installation' : 'Contract'} Date</Text>
          <Text>Expriation Date</Text>
          <Text>Status</Text>
          <Text>FOC</Text>
        </View>
        <View>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
        </View>
        <View style={styles.carddetails}>
          <Text>{moment(data?.start_date).format('DD MMM YYYY')}</Text>
          <Text>
            {moment(data?.end_date).format('DD MMM YYYY')}
            {data?.has_expired && '(Expired)'}
          </Text>
          <Text>{data?.status ? 'active' : 'inactive'}</Text>
          <Text>{data?.is_foc ? 'Yes' : 'No'}</Text>
        </View>
      </View>

      <Text style={{fontSize: 24, fontWeight: '700', textAlign: 'center'}}>
        Machine Models
      </Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.machine_models}
        renderItem={machineList}
        keyExtractor={item => item?.id}
      />

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
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',

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
    paddingRight: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  carddetails: {
    paddingLeft: 20,
  },
  btn: {
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    padding: 5,
    borderWidth: 1,
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  btntxt: {
    color: '#fff',
    fontWeight: 'bold',
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
});

export default ContractDetails;
