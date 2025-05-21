
import axios from 'axios';

const API_URL = 'https://dummyjson.com/users';

export const fetchUsers = async (limit = 12, skip = 0) => {
  try {
    // The API supports limit and skip for pagination
    const response = await axios.get(`${API_URL}?limit=${limit}&skip=${skip}`);
    // The API nests users under a 'users' key and also provides 'total' and 'skip'
    return {
      users: response.data.users,
      total: response.data.total,
      skip: response.data.skip,
      limit: response.data.limit,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    // You might want to throw the error or return a default value / error state
    throw error;
  }
};
