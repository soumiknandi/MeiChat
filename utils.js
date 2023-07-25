import EncryptedStorage from 'react-native-encrypted-storage';

export const getUserFromStorage = async () => {
  let token;
  try {
    let user = await EncryptedStorage.getItem('MeiChat:User');
    if (user) {
      token = JSON.parse(user);
    }
    return token;
  } catch (error) {
    console.log('Error: ', error);
  }
  return token;
};
