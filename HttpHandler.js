import {getUserFromStorage} from './utils';

const baseURL = 'https://totoro-chat.onrender.com/';

const getRequest = async (url, token) => {
  const user = await getUserFromStorage();

  const response = await fetch(baseURL + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token === null ? user.token : token}`,
    },
  });
  return {response: await response.json(), status: response.status};
};

const postRequest = async (url, data, token) => {
  const user = await getUserFromStorage();

  const response = await fetch(baseURL + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token === null ? user.token : token}`,
    },
    body: JSON.stringify(data),
  });

  return {response: await response.json(), status: response.status};
};

module.exports = {
  getRequest,
  postRequest,
  baseURL,
};
