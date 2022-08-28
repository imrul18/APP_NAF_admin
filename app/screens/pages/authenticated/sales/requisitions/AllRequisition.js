import {useIsFocused} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';

import RequisitionService from '../../../../../services/RequisitionService';

const AllRequisition = ({navigation}) => {
  const isFocused = useIsFocused();
  const {user} = useSelector(state => state.authStore);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState();

  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState();

  const getRequisition = async () => {
    setLoading(true);
    const res = await RequisitionService.getAll({page: currentPage});
    setCurrentPage(res.meta.current_page + 1);
    setLastPage(res.meta.last_page);
    let y = data.concat(res.data);
    setData(y);
    setLoading(false);
  };

  useEffect(() => {
    getRequisition();
  }, [isFocused]);

  useEffect(() => {
    setSearchData(data);
  }, [data]);

  const searchFilter = val => {
    const filter = data.filter(item => {
      let str =
        item?.rq_number +
        item?.priority +
        (item?.quotation?.pq_number ? 'yes' : 'no');
      return str.toLowerCase().includes(val.toLowerCase());
    });
    setSearchData(filter);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const res = await RequisitionService.getAll({page: 1});
    setCurrentPage(res.meta.current_page + 1);
    setLastPage(res.meta.last_page);
    setData(res.data);
    setLoading(false);
    setRefreshing(false);
  };

  const Requisition = ({item}) => {
    const component = item => {
      return (
        <>
          <View style={styles.cardtitle}>
            <Text>Requisition ID</Text>
            <Text>Priority</Text>
            <Text>Expected Delivery</Text>
            <Text>Quotation</Text>
          </View>
          <View>
            <Text>:</Text>
            <Text>:</Text>
            <Text>:</Text>
            <Text>:</Text>
          </View>
          <View style={styles.carddetails}>
            <Text>{item?.rq_number}</Text>
            <Text>{item?.priority}</Text>

            <Text>{item?.expected_delivery}</Text>
            <Text>{item?.quotation ? 'Yes' : 'No'}</Text>
          </View>
        </>
      );
    };
    return (
      <>
        {user?.role === 'Admin' ||
        user?.permissions.includes('requisitions_show') ? (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate('RequisitionDetails', {id: item.id});
            }}>
            {component(item)}
          </TouchableOpacity>
        ) : (
          <View style={styles.card}>{component(item)}</View>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchboxcontainer}>
        <View style={styles.searchbox}>
          <TextInput
            onChangeText={val => searchFilter(val)}
            style={styles.searchtext}
            placeholder="Search"
          />
        </View>

        {user?.role === 'Admin' ||
        user?.permissions.includes('requisitions_create') ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              navigation.navigate('AddRequisition');
            }}>
            <FontAwesome name="plus-circle" size={36} color="#fff" />
          </TouchableOpacity>
        ) : (
          <View style={styles.addButton}>
            <FontAwesome name="search" size={36} color="#fff" />
          </View>
        )}
      </View>

      <View style={styles.cardContainer}>
        {searchData?.length ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchData}
            renderItem={Requisition}
            keyExtractor={item => item?.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={() => {
              if (currentPage > lastPage) return;
              else getRequisition();
            }}
          />
        ) : (
          <Text style={styles.notfound}>No data Found</Text>
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
  searchboxcontainer: {
    backgroundColor: '#0e5eb5',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchbox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    width: 300,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  cardContainer: {
    marginBottom: 70,
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
  notfound: {
    textAlign: 'center',
    margin: 20,
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
export default AllRequisition;
