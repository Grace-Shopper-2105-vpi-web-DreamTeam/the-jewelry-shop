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
  console.log('userDetails',userDetails)
  return axios({
    method: "GET",
    url: `${url}/api/orders/${userDetails.user.id}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userDetails.token}`
  }
  }).then((response) => response.data)
}

export const getCart = async (userId) => {
  return axios({
    method: "GET",
    url: `${url}/api/cart/${userId}/cart`
  }).then((response) => response.data)
}

export const createCart = async (userId, token) => {
  return axios({
    method: "POST", 
    url: `${url}/api/cart/${userId}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then((response) => response.data)
}

export const createCartItems = async ({productId, quantity, cart_id}) => {
  return axios({
    method: "POST", 
    url: `${url}/api/cartitem/${cart_id}/items`,
    data: {
      productId,
      quantity
    }
  }).then((response) => response.data)
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
  



