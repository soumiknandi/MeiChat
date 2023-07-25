import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SocketContext} from '../context/SocketContext';
import actions from '../context/actions';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import User from '../components/User';

const ListUserScreen = () => {
  const {state, dispatch} = React.useContext(SocketContext);

  useFocusEffect(
    React.useCallback(() => {
      const handleBackButtonClick = () => {
        Alert.alert(
          'Exit App',
          'Exiting the application?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                state.socket.disconnect();
                BackHandler.exitApp();
              },
            },
          ],
          {
            cancelable: false,
          },
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          handleBackButtonClick,
        );
      };
    }, []),
  );

  useEffect(() => {
    state.socket.emit('register');
    state.socket.on('private_message', msg => {
      dispatch({
        type: actions.ADD_REV_MSG,
        payload: msg,
      });
    });

    state.socket.on('users', users => {
      dispatch({
        type: actions.ADD_USERS,
        payload: users,
      });
    });
  }, []);

  return (
    <>
      <View
        style={{
          borderBottomColor: '#a9a9a9',
          borderWidth: 0.5,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 'bold',
          }}>
          Messages
        </Text>
      </View>
      <FlatList
        data={state.online_users}
        renderItem={({item}) => {
          return <User item={item} />;
        }}
      />
    </>
  );
};

export default ListUserScreen;
