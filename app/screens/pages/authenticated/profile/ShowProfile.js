import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import {useIsFocused} from '@react-navigation/native';
import ActivityService from '../../../../services/ActivityService';
import {useSelector} from 'react-redux';

const ShowProfile = ({navigation}) => {
  const {user} = useSelector(state => state.authStore);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState([]);

  const Activity = async () => {
    if (user) {
      setActivity(
        await ActivityService.getAll({
          log_name: 'users',
          model_id: user.id,
          self: true,
        }),
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    Activity();
  }, [isFocused]);

  const ShowActivity = ({item}) => {
    if (item)
      return (
        <View style={styles.activitycontainer}>
          <View style={styles.icon}>
            {item.event == 'created' && (
              <Octicons name="plus" size={24} color="black" />
            )}
            {item.event == 'updated' && (
              <MaterialIcons name="edit" size={24} color="black" />
            )}
            {item.event == 'deleted' && (
              <MaterialIcons name="delete" size={24} color="black" />
            )}
          </View>
          <View style={styles.message}>
            <Text style={styles.Textmessage}>{item.message}</Text>
            <Text style={styles.Textdetails}>
              {item.causer.name} {item.event} at{' '}
              {moment(item.created_at).format('DD MMM YYYY hh:mm a')}
            </Text>
          </View>
        </View>
      );
  };
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: user?.avatar}} />
      <View style={styles.details}>
        <View>
          <Text>Name:</Text>
          <Text>UserID:</Text>
          <Text>Email:</Text>
          <Text>Designation: </Text>
          <Text>Role:</Text>
          <Text>Status:</Text>
        </View>
        <View>
          <Text>{user?.name}</Text>
          <Text>{user?.id}</Text>
          <Text>{user?.email}</Text>
          <Text>{user?.designation?.name}</Text>
          <Text>{user?.role}</Text>
          <Text>{user?.status == 1 ? 'Active' : 'Inactive'}</Text>
        </View>
      </View>

      <View style={styles.activity}>
        <Text style={styles.activityheading}>Activity</Text>
        <View style={styles.activitylist}>
          <Modal animationType="slide" transparent={true} visible={loading}>
            <View style={styles.loginModalView}>
              <ActivityIndicator size="large" color="red" />
              <Text>Please Wait...</Text>
            </View>
          </Modal>
          <FlatList
            data={activity}
            renderItem={ShowActivity}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View style={styles.back}>
        <TouchableOpacity
          style={styles.buttonback}
          onPress={() => navigation.navigate('EditProfile', {data: user})}>
          <Text style={styles.textStyle}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    backgroundColor: '#efefef',
    flex: 1,
    alignItems: 'center',
  },
  image: {
    flex: 4,
    height: 120,
    width: 130,
    margin: 10,
    borderRadius: 120,
  },
  details: {
    flex: 3,
    flexDirection: 'row',
  },
  activity: {
    flex: 10,
    alignItems: 'center',
  },
  activityheading: {
    fontSize: 20,
    paddingTop: 40,
    fontWeight: '700',
  },
  activitylist: {
    flex: 1,
  },
  activitycontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  icon: {
    marginRight: 10,
    width: 35,
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 100,
    alignItems: 'center',
  },
  Textmessage: {
    fontSize: 16,
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
  back: {
    flex: 2,
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
});
export default ShowProfile;
