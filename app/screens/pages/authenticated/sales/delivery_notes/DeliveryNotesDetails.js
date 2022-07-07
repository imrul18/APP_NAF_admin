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
import DeliverNoteService from '../../../../../services/DeliverNoteService';
import Barcode from 'react-native-barcode-builder';

const DeliveryNotesDetails = ({navigation, route}) => {
  const [data, setData] = useState();

  const [loading, setLoading] = useState(true);

  const getContract = async () => {
    setData(await DeliverNoteService.get(route.params.id));
    setLoading(false);
  };

  useEffect(() => {
    getContract();
  }, []);

  const machineList = item => {
    return (
      <View style={{...styles.card, padding: 10}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.cardtitle}>
            <Text>Part Name</Text>
            <Text>Part Number</Text>
            <Text>Quantity</Text>
            <Text>Total</Text>
          </View>
          <View>
            <Text>:</Text>
            <Text>:</Text>
            <Text>:</Text>
            <Text>:</Text>
          </View>
          <View style={styles.carddetails}>
            <Text>{item?.item?.part?.aliases[0].name}</Text>
            <Text>{item?.item?.part?.aliases[0].part_number}</Text>
            <Text>{item?.item?.quantity ?? ''}</Text>
            <Text>
              {data?.requisition?.type != 'claim_report'
                ? parseInt(item?.item?.total_value)
                : 0}{' '}
              Tk.
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{padding: 10, marginHorizontal: 5, flexDirection: 'row'}}
        onPress={() => {
          navigation.navigate('AllDeliveryNotes');
        }}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={{marginHorizontal: 5, fontSize: 18}}>
          Quotation Details
        </Text>
      </TouchableOpacity>
      <View style={styles.card}>
        <View
          style={{alignSelf: 'center', alignItems: 'center', marginBottom: 15}}>
          <Text>
            {data?.dn_number && (
              <Barcode value={data?.dn_number} height={75} width={2} />
            )}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.cardtitle}>
            <Text>Delivery Note ID</Text>
            <Text>Invoice ID</Text>
            <Text>Company</Text>
            <Text>Priority</Text>
            <Text>Type</Text>
          </View>
          <View>
            <Text>:</Text>
            <Text>:</Text>
            <Text>:</Text>
            <Text>:</Text>
            <Text>:</Text>
          </View>
          <View style={styles.carddetails}>
            <Text>{data?.dn_number}</Text>
            <Text>{data?.invoice?.invoice_number ?? '--'}</Text>
            <Text>{data?.company?.name ?? '--'}</Text>
            <Text>{data?.requisition?.priority ?? '--'}</Text>
            <Text>{data?.requisition?.type ?? '--'}</Text>
          </View>
        </View>
      </View>

      <Text style={{fontSize: 24, fontWeight: '700', textAlign: 'center'}}>
        Part Items
      </Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.part_items}
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

export default DeliveryNotesDetails;
