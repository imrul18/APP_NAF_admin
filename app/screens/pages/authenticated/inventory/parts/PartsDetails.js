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
import PartService from '../../../../../services/PartService';
import PartStockService from '../../../../../services/PartStockService';

const PartsDetails = ({navigation, route}) => {
  const [isStocks, setIsStocks] = useState(true);

  const [data, setData] = useState();
  const [stocks, setStocks] = useState();

  const [loading, setLoading] = useState(true);

  const getRequisition = async () => {
    setData(await PartService.get(route.params.data.id));
    setLoading(false);
  };

  const getStocks = async () => {
    setStocks(await PartStockService.getAll(route.params.data.id));
  };

  useEffect(() => {
    getRequisition();
    getStocks();
  }, []);

  const stockList = item => {
    return (
      <View style={{...styles.card, padding: 10, flexDirection: 'row'}}>
        <View style={{...styles.cardtitle, paddingLeft: 10}}>
          <Text>Warehouse</Text>
          <Text>Box Heading</Text>
          <Text>Unit Value</Text>
          <Text>Unit</Text>
          <Text>Arrival Date</Text>
        </View>
        <View>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
        </View>
        <View style={styles.carddetails}>
          <Text>{item?.item?.warehouse?.name}</Text>
          <Text>{item?.item?.box?.name}</Text>
          <Text>{item?.item?.unit_value}</Text>
          <Text>{item?.item?.unit}</Text>
          <Text>{item?.item?.arrival_date ?? '--'}</Text>
        </View>
      </View>
    );
  };

  const AliasesList = item => {
    return (
      <View style={styles.card}>
        <Text style={{fontWeight: 'bold', flexShrink: 1, paddingLeft: 10}}>
          {item?.item?.name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{...styles.cardtitle}}>
            <Text>Machine</Text>
            <Text>Heading</Text>
            <Text>Part Number</Text>
          </View>
          <View>
            <Text>:</Text>
            <Text>:</Text>
            <Text>:</Text>
          </View>
          <View style={styles.carddetails}>
            <Text>{item?.item?.machine?.name}</Text>
            <Text>{item?.item?.part_heading?.name}</Text>
            <Text>{item?.item?.part_number}</Text>
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
          navigation.navigate('AllParts');
        }}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={{marginHorizontal: 5, fontSize: 18}}>Parts Details</Text>
      </TouchableOpacity>

      <View style={{...styles.card, alignItems: 'center'}}>
        <Image style={styles.image} source={{uri: data?.image}} />
        <Text>{data?.aliases[0]?.name}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={styles.button}
            onPress={() => {
              setIsStocks(true);
            }}>
            Stocks
          </Text>
          <Text
            style={styles.button}
            onPress={() => {
              setIsStocks(false);
            }}>
            Aliases
          </Text>
        </View>
        <Text style={{fontSize: 24, fontWeight: '700', margin: 5}}>
          {isStocks ? 'Stocks' : 'Aliases'}
        </Text>
      </View>

      {isStocks ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={stocks}
          renderItem={stockList}
          keyExtractor={item => item?.id}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data?.aliases}
          renderItem={AliasesList}
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
    paddingRight: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  carddetails: {
    paddingLeft: 20,
  },
  image: {
    height: 150,
    width: 180,
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

export default PartsDetails;
