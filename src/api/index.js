import axios from 'axios';

// export async function getSomething() {
//   try {
//     const { data } = await axios.get('/api');
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

export const getAllProducts = async () => {
  return axios({
    method: "GET",
    url: "/api/products"
  }).then((response) => response.data)
}

export async function login(username, password) {
  try {
    const body = {username, password}
    const { data } = await axios.post('/api/users/login',body);
    return data;
  } catch (error) {
    return error;
  }
}

export async function register(username, password, emailAddress) {
  try {
    const body = {username, password, emailAddress}
    const { data } = await axios.post('/api/users/register',body);
    return data;
  } catch (error) {
    return error;
  }
}

// export const login = async (username, password) => {
//   return axios({
//     method: "POST",
//     url: "/users/login",
//     data: {
//       username: username,
//       password: password,
//     },
//   }).catch((error) => {
//     console.error(error.response.data);
//     if (error.response.data.name == "")
//       return alert(
//         "Either your username or password is incorrect.  Please try again!"
//       );
//   });
// };