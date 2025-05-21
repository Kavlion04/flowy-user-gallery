
import axios from 'axios';

const API_URL = 'https://dummyjson.com/users';

export const fetchUsers = async (limit = 12) => {
  try {
    const response = await axios.get(`${API_URL}?limit=${limit}`);
    // The API nests users under a 'users' key
    return response.data.users; 
  } catch (error) {
    console.error("Error fetching users:", error);
    // You might want to throw the error or return a default value / error state
    throw error; 
  }
};
