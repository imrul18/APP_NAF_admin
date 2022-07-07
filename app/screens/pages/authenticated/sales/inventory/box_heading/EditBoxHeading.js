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
import {useIsFocused} from '@react-navigation/native';
import BoxHeadingService from '../../../../../services/BoxHeadingService';

const windowWidth = Dimensions.get('window').width;

const EditBoxHeading = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [data, setData] = useState();

  const getBox = async () => {
    let res = await BoxHeadingService.get(route.params.data.id);
    setData({name: res.name, description: res.description, id: res.id});
  };

  const UpdateBoxHeading = async () => {
    await BoxHeadingService.update(data.id, data);
    navigation.navigate('AllBoxHeadings', {data: route.params.data});
  };

  const handleChange = (value, name) => {
    const cvalue = value;
    const cname = name;

    setData({
      ...data,
      [cname]: cvalue,
    });
  };

  useEffect(() => {
    if (isFocused) getBox();
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Edit BoxHeading</Text>
      <View style={styles.input}>
        <Text style={styles.inputtxt}> {data?.name} </Text>
        <TextInput
          multiline
          numberOfLines={4}
          style={styles.inputdecs}
          value={data?.description}
          onChangeText={value => {
            handleChange(value, 'description');
          }}
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.buttonsave}
          onPress={() => UpdateBoxHeading()}>
          <Text style={styles.textStyle}>Update</Text>
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
    padding: 15,
    height: 50,
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#afafaf',
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

export default EditBoxHeading;
