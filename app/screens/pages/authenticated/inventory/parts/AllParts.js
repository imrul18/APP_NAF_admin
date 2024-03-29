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
  RefreshControl,
  ActivityIndicator,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import PartService from '../../../../../services/PartService';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AllParts = ({navigation}) => {
  const isFocused = useIsFocused();
  const {user} = useSelector(state => state.authStore);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState();

  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState();

  const getParts = async () => {
    setLoading(true);
    const res = await PartService.getAll({page: currentPage});
    setCurrentPage(res.meta.current_page + 1);
    setLastPage(res.meta.last_page);
    let y = data.concat(res.data);
    setData(y);
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      getParts();
    }
  }, [isFocused]);

  useEffect(() => {
    setSearchData(data);
  }, [data]);

  const searchFilter = val => {
    const filter = data.filter(item => {
      let str = item?.name + item?.designation + item?.role;
      return str.toLowerCase().includes(val.toLowerCase());
    });
    setSearchData(filter);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const res = await PartService.getAll({page: 1});
    setCurrentPage(res.meta.current_page + 1);
    setLastPage(res.meta.last_page);
    setData(res.data);
    setLoading(false);
    setRefreshing(false);
  };

  const deleteEmployee = async id => {
    await PartService.remove(id);
    onRefresh();
  };

  const EmployeeList = ({item}) => {
    const component = item => {
      return (
        <>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.cardtitle}>
              <Image style={styles.image} source={{uri: item?.image}} />
            </View>
            <View style={styles.cardtitle}>
              <Text>Name</Text>
              <Text>Heading</Text>
              <Text>Part Number</Text>
            </View>
            <View>
              <Text>:</Text>
              <Text>:</Text>
              <Text>:</Text>
            </View>
            <View style={{...styles.carddetails}}>
              <Text>{item?.name.slice(0,16)+'...'}</Text>
              <Text>{item?.heading.slice(0,16)+'...'}</Text>
              <Text>{item?.part_number}</Text>
            </View>
          </View>
        </>
      );
    };
    return (
      <>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate('PartsDetails', {data: item});
          }}>
          {component(item)}
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.showemployee}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={searchData}
          renderItem={EmployeeList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={() => {
            if (currentPage > lastPage) return;
            else getParts();
          }}
        />
      </View>

      <Modal animationType="slide" transparent={true} visible={confirmDelete}>
        <View style={styles.loginModalView}>
          <View>
            <Text style={styles.deleteModalmsg}>
              Are you sure you want to delete
              <Text style={{color: '#FF6347'}}> {deleteItem?.name} </Text>?
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
                deleteEmployee(deleteItem.id);
                setConfirmDelete(false);
              }}>
              Yes
            </Text>
          </View>
        </View>
      </Modal>

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
  card: {
    margin: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  image: {
    height: 70,
    width: 60,
    borderRadius: 10,
  },
  cardtitle: {
    paddingRight: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  carddetails: {
    paddingLeft: 20,
  },
  cardactions: {
    justifyContent: 'space-between',
  },
  showemployee: {
    flex: 5,
    height: windowHeight * 0.6,
  },

  loginModalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 100,
    marginVertical: 280,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#7f7f7f',
  },
  deleteModalmsg: {
    textAlign: 'center',
  },
  deleteModaltext: {
    marginHorizontal: 20,
    margin: 5,
    padding: 5,
    width: 50,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    textAlign: 'center',
    color: 'white',
  },
});
export default AllParts;
