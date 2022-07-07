import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import PartService from '../../../../../services/PartService';

const windowWidth = Dimensions.get('window').width;

const GetWarehouse = ({route, navigation}) => {
  const data = route.params.data;

  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);

  const [parts, setParts] = useState([]);

  const getParts = async filters => {
    setParts(await PartService.getAll(filters));
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      getParts({warehouse_id: data.id});
    }
  }, [isFocused]);

  const ShowParts = ({item}) => {
    return (
      <View style={styles.activitycontainer}>
        <View style={styles.message}>
          <Text style={styles.Textdetails}>{item.name}</Text>
          <Text style={styles.Textdetails}>{item.heading}</Text>
          <Text style={styles.Textdetails}>{item.part_number}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.Textname}>Name: {data.name}</Text>
        <Text style={styles.Text}>Description:</Text>
        {data?.description && (
          <Text style={styles.Textdecs}>{data.description}</Text>
        )}
      </View>
      <View style={styles.activity}>
        <Text style={styles.activityheading}>Parts List</Text>
        <View style={styles.message}>
          <Text style={styles.Textdetailsheading}>Common Name</Text>
          <Text style={styles.Textdetailsheading}>Heading</Text>
          <Text style={styles.Textdetailsheading}>Part Number</Text>
        </View>
        <Modal animationType="slide" transparent={true} visible={loading}>
          <View style={styles.loginModalView}>
            <ActivityIndicator size="large" color="red" />
            <Text>Please Wait...</Text>
          </View>
        </Modal>
        <FlatList
          data={parts.data}
          renderItem={ShowParts}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.back}>
        <TouchableOpacity
          style={styles.buttonback}
          onPress={() => navigation.goBack()}>
          <Text style={styles.textStyle}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#efefef',
  },
  details: {
    flex: 2,
    alignItems: 'center',
    padding: 5,
  },
  activity: {
    flex: 9,
  },
  back: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
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
  Textname: {
    fontSize: 20,
    fontWeight: '700',
  },
  Text: {
    fontSize: 16,
  },
  Textdecs: {
    fontSize: 16,
    height: 80,
    textAlign: 'justify',
  },
  activitycontainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    margin: 2,
  },
  message: {
    flexDirection: 'row',
  },
  activityheading: {
    fontSize: 24,
    fontWeight: '800',
    alignSelf: 'center',
    marginBottom: 10,
  },
  Textdetails: {
    width: windowWidth * 0.33,
    textAlign: 'center',
    alignSelf: 'center',
  },
  Textdetailsheading: {
    width: windowWidth * 0.33,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: '700',
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
});

export default GetWarehouse;
