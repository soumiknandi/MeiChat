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
import {useNavigation, useRoute} from '@react-navigation/native';
import {resentOTP, validateOTP} from '../APIHandler';

const VerifyUser = () => {
  const {state, dispatch} = React.useContext(SocketContext);
  const {navigate} = useNavigation();
  const route = useRoute();

  const [form, setForm] = useState({
    otp: '',
  });

  const verifyUser = async () => {
    if (form.otp.trim() !== '') {
      const response = await validateOTP(form, route.params.token);
      if (response.status === 200) {
        dispatch({
          type: actions.LOGIN,
          payload: response.response,
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
        'OTP is blank',
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
            height: 60,
            flexDirection: 'row',
            justifyContent: 'center',
            textAlign: 'center',
            margin: 8,
          }}
          value={form.email}
          onChangeText={text =>
            setForm({
              ...form,
              otp: text,
            })
          }
          placeholder="OTP"
        />

        <TouchableOpacity onPress={verifyUser} style={styles.connectBtn}>
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
            }}>
            Verify
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            await resentOTP();
          }}
          style={styles.connectBtn}>
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
            }}>
            Resent E-Mail
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyUser;

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
