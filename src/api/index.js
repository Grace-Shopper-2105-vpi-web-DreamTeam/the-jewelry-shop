import axios from 'axios';

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