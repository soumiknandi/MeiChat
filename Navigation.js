import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ListUserScreen from './screens/ListUserScreen';
import UserChatScreen from './screens/UserChatScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import VerifyUser from './screens/VerifyUser';
import {SocketContext} from './context/SocketContext';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {state, dispatch} = React.useContext(SocketContext);
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      // navigation.navigate(remoteMessage.data.type);
    });
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {state.socket === undefined ? (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="VerifyUser" component={VerifyUser} />
          </>
        ) : (
          <>
            <Stack.Screen name="ListUserScreen" component={ListUserScreen} />
            <Stack.Screen name="UserChatScreen" component={UserChatScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
