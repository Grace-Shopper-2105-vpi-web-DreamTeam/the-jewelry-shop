import axios from 'axios';
//import { response } from 'express';

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
  .catch((error) => console.error(error.response.data));
}

export const getProductsByCategory = async (category) => {
  return axios({
    method: "GET",
    url: `/api/products/category/${category}`
  }).then((response) => response.data)
}