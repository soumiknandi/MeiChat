import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SocketContext} from '../context/SocketContext';
import actions from '../context/actions';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

const SetUserNameScreen = () => {
  const [userName, setUserName] = useState('');
  const {state, dispatch} = React.useContext(SocketContext);
  const {navigate} = useNavigation();

  const submitUserName = uName => {
    if (uName.trim() !== '') {
      state.socket.emit('register', uName);
      dispatch({
        type: actions.SET_USER_NAME,
        payload: uName,
      });
      state.socket.on('users', users => {
        dispatch({
          type: actions.ADD_USERS,
          payload: users,
        });
      });
      EncryptedStorage.setItem('MeiChat:Username', uName);
      navigate('ListUserScreen');
    }
  };

  useEffect(() => {
    EncryptedStorage.getItem('MeiChat:Username').then(username => {
      if (username) {
        submitUserName(username);
      }
    });
  }, []);

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
      <View
        style={{
          flexGrow: 0.1,
        }}>
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
          value={userName}
          onChangeText={text => setUserName(text)}
          placeholder="Your Name"
        />

        <TouchableOpacity
          onPress={() => submitUserName(userName)}
          style={styles.connectBtn}>
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetUserNameScreen;

const styles = StyleSheet.create({
  connectBtn: {
    height: 60,
    borderWidth: 1,
    borderColor: '#F0C0A7',
    backgroundColor: '#F0C0A7',
    justifyContent: 'center',
    borderRadius: 25,
    margin: 8,
    padding: 8,
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
  },
});
