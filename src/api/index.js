import axios from 'axios';

// export async function getSomething() {
//   try {
//     const { data } = await axios.get('/api');
//     console.log("data", data)
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
