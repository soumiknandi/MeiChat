import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';
import {SocketContext} from '../context/SocketContext';
import actions from '../context/actions';
import {useNavigation} from '@react-navigation/native';
import {loginUser} from '../APIHandler';
import EncryptedStorage from 'react-native-encrypted-storage';
import {baseURL} from '../HttpHandler';
import messaging from '@react-native-firebase/messaging';

const LoginScreen = () => {
  const {state, dispatch} = React.useContext(SocketContext);
  const {navigate} = useNavigation();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    if (form.email.trim() !== '' && form.password.trim() !== '') {
      const response = await loginUser({
        ...form,
        fcm: await messaging().getToken(),
      });
      if (response.status === 200) {
        EncryptedStorage.setItem(
          'MeiChat:User',
          JSON.stringify(response.response),
        );

        dispatch({
          type: actions.LOGIN,
          payload: response.response,
        });
        const socketIO = await io(baseURL, {
          extraHeaders: {
            authorization: 'Bearer ' + response.response.token,
          },
        });
        socketIO.on('connect', () => {
          dispatch({
            type: actions.CONNECT,
            payload: socketIO,
          });
          // navigate('ListUserScreen');
          EncryptedStorage.getItem('MeiChat:online_users').then(
            online_users => {
              console.log('Old', online_users);
              if (online_users) {
                // console.log(JSON.parse(online_users));
                dispatch({
                  type: actions.SET_OLD_CHATS,
                  payload: JSON.parse(online_users),
                });
              }
            },
          );
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

        <TouchableOpacity onPress={handleLogin} style={styles.connectBtn}>
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
            }}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigate('RegisterScreen');
          }}
          style={styles.connectBtn}>
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
            }}>
            Don't have an account?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

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
