import EncryptedStorage from 'react-native-encrypted-storage';
import actions from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case actions.CLEAR:
      return {
        socket: undefined,
        user: undefined,
        online_users: [],
      };
    case actions.CONNECT:
      return {
        ...state,
        socket: action.payload,
      };
    case actions.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case actions.ADD_USERS:
      let filteredUsers = [];
      console.log('-1', action.payload);
      console.log('0', state.online_users);

      if (state.online_users.length === 0) {
        filteredUsers = action.payload.map(user => {
          user.isOnline = true;
          user.chats = [];
          return user;
        });
        console.log('1', filteredUsers);
      } else {
        filteredUsers = state.online_users.map(oldUser => {
          console.log('action.payload', action.payload);
          if (action.payload.some(cou => cou.email === oldUser.email)) {
            oldUser.id = action.payload.find(u => oldUser.email === u.email).id;
            oldUser.isOnline = true;
          } else {
            oldUser.isOnline = false;
          }
          return oldUser;
        });

        console.log('Before For');
        for (let i = 0; i < action.payload.length; i++) {
          const element = action.payload[i];
          console.log('element', element);
          if (!filteredUsers.some(u => u.email === element.email)) {
            filteredUsers.push({
              ...element,
              isOnline: true,
              chats: [],
            });
          }
        }

        // for (let index = 0; index < state.online_users.length; index++) {
        //   if (
        //     action.payload.some(
        //       cou => cou.username === state.online_users[index].username,
        //     )
        //   ) {

        //   }

        //   // if (
        //   //   !currOnlineUsers.some(
        //   //     ou => ou.username === state.online_users[index].username,
        //   //   )
        //   // ) {
        //   //   state.online_users[index].isOnline = false;
        //   //   filteredUsers.push(state.online_users[index]);
        //   // } else {
        //   //   filteredUsers.push(state.online_users[index]);
        //   // }
        // }
        // console.log('3', filteredUsers);

        // const newUsers = currOnlineUsers.map(u => {
        //   if (!filteredUsers.some(fu => fu.username === u.username)) {
        //     u.isOnline = true;
        //     if (!('chats' in u)) {
        //       u.chats = [];
        //     }
        //   } else {
        //     u.isOnline = true;
        //     u.id = filteredUsers.find(fum => fum.username === u.username).id;
        //   }
        //   return u;
        // });
        // console.log('4', newUsers);

        // filteredUsers = [...newUsers, ...filteredUsers];
        console.log('4', filteredUsers);
      }

      filteredUsers = filteredUsers.filter(u => u.id !== state.socket.id);
      console.log('5', filteredUsers);

      EncryptedStorage.setItem(
        'MeiChat:online_users',
        JSON.stringify(filteredUsers),
      );

      return {
        ...state,
        online_users: filteredUsers,
      };

    case actions.ADD_SENT_MSG:
      let temp_chat_sent = state.online_users.map(user => {
        if (user.email === action.payload.to) {
          user.chats.push({
            msg: action.payload.msg,
            isSent: true,
            timestamp: action.payload.timestamp,
            toMail: action.payload.toMail,
          });
        }
        return user;
      });
      // console.log('temp_chat_sent', temp_chat_sent);
      EncryptedStorage.setItem(
        'MeiChat:online_users',
        JSON.stringify(temp_chat_sent),
      );
      return {
        ...state,
        online_users: temp_chat_sent,
      };
    case actions.ADD_REV_MSG:
      const temp_chat_rev = state.online_users.map(user => {
        if (user.email === action.payload.from) {
          user.chats.push({
            msg: action.payload.message,
            isSent: false,
            timestamp: action.payload.timestamp,
          });
        }
        return user;
      });

      EncryptedStorage.setItem(
        'MeiChat:online_users',
        JSON.stringify(temp_chat_rev),
      );
      return {
        ...state,
        online_users: temp_chat_rev,
      };
    case actions.SET_OLD_CHATS:
      return {
        ...state,
        online_users: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
