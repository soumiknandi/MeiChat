const {getRequest, postRequest} = require('./HttpHandler');

const registerUser = async data => {
  const res = await postRequest('register', data);
  console.log(res);
  return res;
};

const loginUser = async data => {
  const res = await postRequest('login', data);
  console.log(res);
  return res;
};

const resentOTP = async () => {
  const res = await getRequest('resend-validation-email');
  console.log(res);
  return res;
};

const validateOTP = async (data, token) => {
  const res = await postRequest('validate', data, token);
  console.log(res);
  return res;
};

const testGet = async () => {
  const data = await getRequest('');
  console.log(data);
};

module.exports = {
  registerUser,
  validateOTP,
  loginUser,
  testGet,
  resentOTP,
};
