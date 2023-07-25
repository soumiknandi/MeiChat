import {View, Text, TouchableOpacity, TextInput, FlatList} from 'react-native';
import React, {useState} from 'react';
import {SocketContext} from '../context/SocketContext';
import actions from '../context/actions';
import {useRoute} from '@react-navigation/native';
import ChatBubble from '../components/ChatBubble';

const UserChatScreen = () => {
  const {state, dispatch} = React.useContext(SocketContext);
  const [msg, setMsg] = useState('');
  const route = useRoute();

  console.log('route.params', route.params);
  const getUser = email => {
    return state.online_users.find(user => user.email === email);
  };

  const getUserChat = email => {
    return getUser(email).chats.sort((a, b) =>
      a.timestamp < b.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0,
    );
  };

  const getUserId = email => {
    let temp = state.online_users.find(u => u.email === email);
    return temp !== undefined && temp.isOnline === true ? temp.id : undefined;
  };

  const sendMsg = () => {
    if (msg.trim() !== '') {
      const timestamp = new Date().getTime();
      state.socket.emit('private_message', {
        to: getUserId(route.params.email),
        toMail: route.params.email,
        message: msg,
        timestamp,
      });
      dispatch({
        type: actions.ADD_SENT_MSG,
        payload: {
          msg,
          to: route.params.email,
          timestamp,
          toMail: route.params.email,
        },
      });
      setMsg('');
    }
    console.log(state.online_users);
  };

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
          {route.params.name} •
          {getUser(route.params.email).isOnline ? 'Online' : 'Offline'}
        </Text>
      </View>
      <FlatList
        inverted
        style={{}}
        data={getUserChat(route.params.email)}
        renderItem={({item}) => <ChatBubble item={item} />}
      />

      <View
        style={{
          justifyContent: 'flex-end',
        }}>
        {/* {getUser(route.params.email).isOnline ? ( */}
        <View
          style={{
            flexDirection: 'row',
            borderTopColor: '#e2e2e2',
            justifyContent: 'space-around',
            alignSelf: 'center',
            padding: 10,
          }}>
          <TextInput
            style={{
              flex: 0.8,
              borderColor: '#a9a9a9',
              borderWidth: 0.4,
              borderRadius: 25,
            }}
            value={msg}
            onChangeText={setMsg}
            placeholder="Type Here"
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#F54B7C',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              height: 50,
              flex: 0.2,
              borderRadius: 50,
              marginHorizontal: 8,
            }}
            onPress={sendMsg}>
            <Text
              style={{
                fontSize: 18,
                verticalAlign: 'middle',

                color: 'white',
                alignContent: 'center',
                textAlign: 'center',
                alignSelf: 'center',
              }}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
        {/* ) : (
          <View
            style={{
              flexDirection: 'row',
              borderTopColor: '#e2e2e2',
              justifyContent: 'space-around',
              alignSelf: 'center',
              padding: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
              }}>
              {route.params.email} is currently offline
            </Text>
          </View>
        )} */}
      </View>
    </>
  );
};

export default UserChatScreen;
