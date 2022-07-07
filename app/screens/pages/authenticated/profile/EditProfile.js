import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import ProfileService from '../../../../services/ProfileService';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditProfile = ({route, navigation}) => {
  const data = route.params.data;

  const [updatedata, setUpdateData] = useState({
    name: data.name,
    email: data.email,
  });
  const handleChange = (value, name) => {
    let cvalue = value;
    let cname = name;

    setUpdateData({
      ...updatedata,
      [cname]: cvalue,
    });
  };
  const updateEmployee = async () => {
    if (updatedata) await ProfileService.updateProfile(updatedata);
    navigation.navigate('ShowProfile');
  };

  const [password, setPassword] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const handlePassword = (value, name) => {
    let cvalue = value;
    let cname = name;

    setPassword({
      ...password,
      [cname]: cvalue,
    });
  };
  const updatePassword = async () => {
    if (password) await ProfileService.changePassword(password);
    navigation.navigate('ShowProfile');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>EDIT EMPLOYEE</Text>
      <View style={styles.input}>
        <TextInput
          style={styles.inputtxt}
          value={updatedata.name}
          onChangeText={value => {
            handleChange(value, 'name');
          }}
        />
        <TextInput
          style={styles.inputtxt}
          value={updatedata.email}
          onChangeText={value => {
            handleChange(value, 'email');
          }}
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.buttonsave}
          onPress={() => updateEmployee()}>
          <Text style={styles.textStyle}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.inputtxt}
          placeholder="Current Password"
          onChangeText={value => {
            handlePassword(value, 'current_password');
          }}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.inputtxt}
          placeholder="New Password"
          onChangeText={value => {
            handlePassword(value, 'password');
          }}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.inputtxt}
          placeholder="Comfirm Password"
          onChangeText={value => {
            handlePassword(value, 'password_confirmation');
          }}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.buttonsave}
          onPress={() => updatePassword()}>
          <Text style={styles.textStyle}>change Password</Text>
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
    margin: 10,
  },
  inputtxt: {
    width: windowWidth * 0.7,
    height: 50,
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

export default EditProfile;
