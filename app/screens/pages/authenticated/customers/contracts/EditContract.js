import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-date-picker';
import CheckBox from '@react-native-community/checkbox';
import ContractService from '../../../../../services/ContractService';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditContract = ({navigation, route}) => {
  const oldData = route.params.data;

  const [data, setData] = useState({
    ...oldData,
    start_date: new Date(oldData.start_date),
    end_date: new Date(oldData.end_date),
    is_foc: oldData?.is_foc == 0 ? false : true,
  });

  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  const updateContract = async () => {
    await ContractService.update(oldData.id, data);
    navigation.navigate('AllContracts');
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
      <Text style={styles.heading}>EDIT CONTRACT</Text>
      <View style={styles.input}>
        <View style={styles.select}>
          <Text style={styles.label}>Start Date:</Text>
          <Text style={styles.date}>
            {data?.start_date.getDate().toString() +
              '-' +
              (data?.start_date.getMonth() + 1).toString() +
              '-' +
              data?.start_date.getFullYear().toString()}
          </Text>
          <FontAwesome5
            style={styles.calender}
            name="calendar-alt"
            size={24}
            color="black"
            onPress={() => setStartOpen(true)}
          />

          <DatePicker
            modal
            mode="date"
            open={startOpen}
            date={data.start_date}
            onConfirm={date => {
              setStartOpen(false);
              handleChange(date, 'start_date');
            }}
            onCancel={() => {
              setStartOpen(false);
            }}
          />
        </View>

        <View style={styles.select}>
          <Text style={styles.label}>End Date:</Text>
          <Text style={styles.date}>
            {data?.end_date.getDate().toString() +
              '-' +
              (data?.end_date.getMonth() + 1).toString() +
              '-' +
              data?.end_date.getFullYear().toString()}
          </Text>
          <FontAwesome5
            style={styles.calender}
            name="calendar-alt"
            size={24}
            color="black"
            onPress={() => setEndOpen(true)}
          />

          <DatePicker
            modal
            mode="date"
            open={endOpen}
            date={data.end_date}
            onConfirm={date => {
              setEndOpen(false);
              handleChange(date, 'end_date');
            }}
            onCancel={() => {
              setEndOpen(false);
            }}
          />
        </View>

        <View style={styles.inputareatxt}>
          <TextInput
            placeholder="Note"
            onChangeText={val => handleChange(val, 'notes')}
            style={styles.a}
            value={data.description}
            multiline
            numberOfLines={4}
          />
        </View>
        <View style={styles.select}>
          <CheckBox
            value={data?.is_foc}
            onValueChange={() => {
              handleChange(!data.is_foc, 'is_foc');
            }}
          />
          <Text>Under FOC</Text>
        </View>
        <View style={styles.select}>
          <CheckBox
            value={data?.status}
            onValueChange={() => {
              handleChange(!data.status, 'status');
            }}
          />
          <Text>Active Status</Text>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.buttonsave} onPress={updateContract}>
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
  inputareatxt: {
    width: windowWidth * 0.7,
    height: 100,
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
  },
  select: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingHorizontal: 40,
    padding: 2,
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
    marginTop: 40,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  label: {
    width: 100,
  },
  date: {
    width: 100,
  },
  calender: {
    width: 100,
  },
});

export default EditContract;
