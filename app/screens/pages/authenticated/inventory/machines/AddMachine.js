import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import MachineService from '../../../../../services/MachineService';

const windowWidth = Dimensions.get('window').width;

const AddMachine = ({navigation}) => {
  const [data, setData] = useState({
    name: '',
    description: '',
  });

  const createMachine = async () => {
    await MachineService.create(data);
    navigation.navigate('AllMachines');
  };

  const handleChange = (value, name) => {
    const cvalue = value;
    const cname = name;

    setData({
      ...data,
      [cname]: cvalue,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>ADD Machine</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.inputtxt}
          placeholder="Name"
          onChangeText={value => {
            handleChange(value, 'name');
          }}
        />
        <TextInput
          multiline
          numberOfLines={4}
          style={styles.inputdecs}
          placeholder="description"
          onChangeText={value => {
            handleChange(value, 'description');
          }}
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.buttonsave}
          onPress={() => createMachine()}>
          <Text style={styles.textStyle}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonback}
          onPress={() => navigation.goBack()}>
          <Text style={styles.textStyle}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  heading: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '700',
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    alignItems: 'center',
    margin: 40,
  },
  inputtxt: {
    width: windowWidth * 0.7,
    height: 50,
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
  },
  inputdecs: {
    width: windowWidth * 0.7,
    height: 200,
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
  },
  select: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: 40,
  },
  inputselecttxt: {
    marginVertical: 15,
    width: 80,
  },
  inputselect: {
    width: windowWidth * 0.7,
    padding: 5,
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsave: {
    width: windowWidth * 0.5,
    backgroundColor: '#2196F3',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 10,
  },
  buttonback: {
    backgroundColor: '#2196F3',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 80,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default AddMachine;
