import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const User = ({item: {name, email, isOnline, chats}}) => {
  const {navigate} = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={{paddingHorizontal: 8, marginVertical: 8}}
        onPress={() => navigate('UserChatScreen', {email: email, name: name})}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 18,
            }}>
            {name}
          </Text>
          <Text
            style={{
              fontSize: 14,
            }}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 14,
            color: '#a9a9a9',
          }}>
          {chats?.length > 0 ? chats[0].msg : 'No Messages'}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: 'black',
          height: 0.5,
          marginHorizontal: 8,
        }}
      />
    </>
  );
};

export default User;
