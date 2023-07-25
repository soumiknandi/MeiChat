import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {SocketContext} from '../context/SocketContext';
import {useNavigation} from '@react-navigation/native';
import {registerUser} from '../APIHandler';

const RegisterScreen = () => {
  const {state, dispatch} = React.useContext(SocketContext);
  const {navigate} = useNavigation();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const handlerRegisterUser = async () => {
    if (
      form.first_name !== undefined &&
      form.first_name.trim() !== '' &&
      form.last_name !== undefined &&
      form.last_name.trim() !== '' &&
      form.email !== undefined &&
      form.email.trim() !== '' &&
      form.password !== undefined &&
      form.password.trim() !== '' &&
      form.cpassword !== undefined &&
      form.cpassword.trim() !== '' &&
      form.password === form.cpassword
    ) {
      const response = await registerUser(form);
      if (response.status === 201) {
        navigate('VerifyUser', {
          token: response.response.token,
        });
      } else {
        Alert.alert(
          'Incorrect Data',
          response.response.message,
          [
            {
              text: 'OK',
            },
          ],
          {
            cancelable: false,
          },
        );
      }
    } else {
      Alert.alert(
        'Incorrect Data',
        'Please fill up the form correctly',
        [
          {
            text: 'OK',
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
      }}>
      <View
        style={{
          flexGrow: 0.9,
        }}
      />
      <View style={{}}>
        <TextInput
          style={{
            borderColor: '#a9a9a9',
            borderWidth: 0.4,
            borderRadius: 25,
            flexDirection: 'row',
            justifyContent: 'center',
            textAlign: 'center',
            margin: 8,
          }}
          value={form.first_name}
          onChangeText={text =>
            setForm({
              ...form,
              first_name: text,
            })
          }
          placeholder="First Name"
        />

        <TextInput
          style={{
            borderColor: '#a9a9a9',
            borderWidth: 0.4,
            borderRadius: 25,
            flexDirection: 'row',
            justifyContent: 'center',
            textAlign: 'center',
            margin: 8,
          }}
          value={form.last_name}
          onChangeText={text =>
            setForm({
              ...form,
              last_name: text,
            })
          }
          placeholder="Last Name"
        />

        <TextInput
          style={{
            borderColor: '#a9a9a9',
            borderWidth: 0.4,
            borderRadius: 25,
            flexDirection: 'row',
            justifyContent: 'center',
            textAlign: 'center',
            margin: 8,
          }}
          value={form.email}
          onChangeText={text =>
            setForm({
              ...form,
              email: text,
            })
          }
          placeholder="E-Mail Address"
        />

        <TextInput
          style={{
            borderColor: '#a9a9a9',
            borderWidth: 0.4,
            borderRadius: 25,
            flexDirection: 'row',
            justifyContent: 'center',
            textAlign: 'center',
            margin: 8,
          }}
          value={form.password}
          onChangeText={text =>
            setForm({
              ...form,
              password: text,
            })
          }
          placeholder="Password"
        />

        <TextInput
          style={{
            borderColor: '#a9a9a9',
            borderWidth: 0.4,
            borderRadius: 25,
            flexDirection: 'row',
            justifyContent: 'center',
            textAlign: 'center',
            margin: 8,
          }}
          value={form.cpassword}
          onChangeText={text =>
            setForm({
              ...form,
              cpassword: text,
            })
          }
          placeholder="Confirm Password"
        />

        <TouchableOpacity
          onPress={handlerRegisterUser}
          style={styles.connectBtn}>
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
            }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  connectBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#F0C0A7',
    backgroundColor: '#F0C0A7',
    justifyContent: 'center',
    borderRadius: 25,
    margin: 8,
    padding: 8,
    paddingHorizontal: 18,
  },
});
