import axios from 'axios';

export const getAllProducts = async () => {
  return axios({
    method: "GET",
    url: "/api/products"
  }).then((response) => response.data)
}


export const login = async (username, password) => {
  return axios({
    method: "POST",
    url: "api/users/login",
    data: {
      username: username,
      password: password,
    },
  }).then((response) => response.data)
};

export const register = async (username, password, emailAddress) => {
  return axios({
    method: "POST",
    url: "api/users/register",
    data: {
      username: username,
      password: password,
      emailAddress: emailAddress
    },
  }).then((response) => response.data)
};

// export async function login(username, password) {
//   try {
//     const body = {username, password}
//     const { data } = await axios.post('/api/users/login',body);
//     return data;
//   } catch (error) {
//     return error;
//   }
// }

// export async function register(username, password, emailAddress) {
//   try {
//     const body = { username, password, emailAddress }
//     const { data } = await axios.post('/api/users/register', body);
//     return data;
//   } catch (error) {
//     return error;
//   }
// }