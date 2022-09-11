import {useIsFocused} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
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
import {useSelector} from 'react-redux';
import InvoiceService from '../../../../../services/InvoiceService';

const AllInvoices = ({navigation}) => {
  const isFocused = useIsFocused();
  const {user} = useSelector(state => state.authStore);

  const [loading, setLoading] = useState(false);
  const pageEntry = useRef(false)
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState();

  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState();

  const getInvoices = async () => {
    setLoading(true);
    const res = await InvoiceService.getAll({page: currentPage});
    setCurrentPage(res.meta.current_page + 1);
    setLastPage(res.meta.last_page);
    let y = data.concat(res.data);
    setData(y);
    setLoading(false);
  };

  useEffect(() => {
    if(pageEntry.current == false)
    {
      getInvoices();
      pageEntry.current = true
    }
    else 
      pageEntry.current = false

  }, [isFocused]);


  useEffect(() => {
    setSearchData(data);
  }, [data]);

  const searchFilter = val => {
    const filter = data.filter(item => {
      let str =
        item?.invoice_number +
        item?.requisition?.priority +
        item?.requisition?.type;
      return str.toLowerCase().includes(val.toLowerCase());
    });
    setSearchData(filter);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const res = await InvoiceService.getAll({page: 1});
    setCurrentPage(res.meta.current_page + 1);
    setLastPage(res.meta.last_page);
    setData(res.data);
    setLoading(false);
    setRefreshing(false);
  };

  const invoiceList = ({item}) => {
    const component = item => {
      return (
        <>
          <View style={styles.cardtitle}>
            <Text>Invoice ID</Text>
            <Text>Company</Text>
            <Text>Requisition Type</Text>
            <Text>Part Quantity</Text>
            <Text>Total</Text>
            <Text>Delivery Notes</Text>
          </View>
          <View>
            <Text>:</Text>
            <Text>:</Text>
            <Text>:</Text>
            <Text>:</Text>
            <Text>:</Text>
            <Text>:</Text>
          </View>
          <View style={styles.carddetails}>
            <Text>{item?.invoice_number}</Text>
            <Text>{item?.company?.name}</Text>
            <Text>
              {item?.requisition?.type == 'claim_report'
                ? 'Claim Report'
                : 'Puchase Request'}
            </Text>
            <Text>
              {item?.part_items?.reduce(
                (partialSum, a) => partialSum + a.quantity,
                0,
              )}
            </Text>
            <Text>
              {item?.requisition?.type != 'claim_report'
                ? item?.part_items?.reduce(
                    (partialSum, a) => partialSum + parseInt(a.total_value),
                    0,
                  )
                : 0}{' '}
              Tk.
            </Text>
            <Text>{item?.deliveryNote ? 'Yes' : 'No'}</Text>
          </View>
        </>
      );
    };
    return (
      <>
        {user?.role === 'Admin' ||
        user?.permissions.includes('invoices_show') ? (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate('InvoiceDetails', {id: item.id});
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
      </View>

      <View style={styles.cardContainer}>
        {searchData?.length ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchData}
            renderItem={invoiceList}
            keyExtractor={item => item?.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={() => {
              if (currentPage > lastPage) return;
              else getInvoices();
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
  },
  searchbox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
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
export default AllInvoices;
