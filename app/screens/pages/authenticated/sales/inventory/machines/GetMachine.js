import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

import GetMachineInner from './get_machine/GetMachineInner';

const GetMachine = ({route, navigation}) => {
  const data = route.params.data;

  const isFocused = useIsFocused();

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
        <GetMachineInner id={data.id} />
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
    flex: 8,
    width: windowWidth,
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
    margin: 10,
  },

  message: {
    padding: 10,
  },
  activityheading: {
    fontSize: 24,
    fontWeight: '800',
    alignSelf: 'center',
  },
  loading: {
    alignSelf: 'center',
    fontSize: 20,
  },
});

export default GetMachine;
