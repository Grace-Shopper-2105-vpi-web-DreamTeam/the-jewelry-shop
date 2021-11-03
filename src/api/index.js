import axios from 'axios';

const url = "https://frozen-lake-03331.herokuapp.com"

export const getAllProducts = async () => {
  return axios({
    method: "GET",
    url: `${url}/api/products`
  }).then((response) => response.data)
}

export const getProductsByCategory = async (category) => {
  return axios({
    method: "GET",
    url: `${url}/api/products/category/${category}`
  }).then((response) => response.data)
}

export const login = async (username, password) => {
  return axios({
    method: "POST",
    url: `${url}/api/users/login`,
    data: {
      username: username,
      password: password,
    },
  }).then((response) => response.data)
};

export const register = async (username, password, emailAddress) => {
  return axios({
    method: "POST",
    url: `${url}/api/users/register`,
    data: {
      username: username,
      password: password,
      emailAddress: emailAddress
    },
  }).then((response) => response.data)
};

export const getUserOrders = async (userDetails) => {
  return axios({
    method: "GET",
    url: `${url}/api/orders/${userDetails.user.id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userDetails.token}`
  }
  }).then((response) => response.data)
}

export const getAllUsers = async (userDetails) => {
  console.log('userDetailsAllUsers',userDetails)
  return axios({
    method: "GET",
    url: `${url}/api/users/admin`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userDetails.token}`
  }
  }).then((response) => response.data)
}

export const getAllOrders = async (userDetails) => {
  console.log('userDetailsAllOrders',userDetails)
  return axios({
    method: "GET",
    url: `${url}/api/orders`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userDetails.token}`
  }
  }).then((response) => response.data)
}

export const updateUserAdmin = async (userId, userDetails) => {
  console.log('userDetailsAllOrders',userDetails)
  console.log('userIdUPDATEADMIN', userId)
  return axios({
    method: "PATCH",
    url: `${url}/api/users/admin/${userId}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userDetails.token}`
  }
  }).then((response) => {console.log('RESPONSE', response); return response.data })
  
}

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
  



