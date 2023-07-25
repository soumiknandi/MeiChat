import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {io} from 'socket.io-client';
import {SocketContext} from '../context/SocketContext';
import actions from '../context/actions';
import {useNavigation} from '@react-navigation/native';
import {testGet} from '../APIHandler';
import {baseURL} from '../HttpHandler';
import EncryptedStorage from 'react-native-encrypted-storage';
import {getUserFromStorage} from '../utils';

const HomeScreen = () => {
  const {state, dispatch} = React.useContext(SocketContext);
  const {navigate} = useNavigation();

  // useEffect(() => {
  //   AsyncStorage.getItem('MeiChat:online_users').then(online_users => {
  //     console.log('Old', online_users);
  //     if (online_users) {
  //       // console.log(JSON.parse(online_users));
  //       dispatch({
  //         type: actions.SET_OLD_CHATS,
  //         payload: JSON.parse(online_users),
  //       });
  //     }
  //   });
  // }, []);

  const connectToServer = async () => {
    await testGet();
    const user = await getUserFromStorage();
    console.log('user', user);
    if (user !== undefined) {
      const socketIO = await io(baseURL, {
        extraHeaders: {
          authorization: 'Bearer ' + user.token,
        },
      });
      socketIO.on('connect', async () => {
        console.log(socketIO);
        await dispatch({
          type: actions.CONNECT,
          payload: socketIO,
        });
        dispatch({
          type: actions.LOGIN,
          payload: user,
        });

        EncryptedStorage.getItem('MeiChat:online_users').then(online_users => {
          console.log('Old', online_users);
          if (online_users) {
            // console.log(JSON.parse(online_users));
            dispatch({
              type: actions.SET_OLD_CHATS,
              payload: JSON.parse(online_users),
            });
          }
        });
        // navigate('ListUserScreen');
      });

      socketIO.on('connection_error', async () => {
        dispatch({
          type: actions.CLEAR,
          payload: socketIO,
        });
        await EncryptedStorage.removeItem('MeiChat:User');
        navigate('LoginScreen');
      });
    } else {
      navigate('LoginScreen');
    }
  };

  return (
    <View
      style={{
        flexGrow: 1,
      }}>
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          flexDirection: 'row',
          position: 'absolute',
          bottom: 80,
        }}>
        <TouchableOpacity onPress={connectToServer} style={styles.connectBtn}>
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
            }}>
            Connect
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  connectBtn: {
    height: 60,
    flex: 1,
    flexGrow: 1,
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
