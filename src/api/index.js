import axios from 'axios';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    console.log("you've hit the api")
    return data;
  } catch (error) {
    throw error;
  }
}