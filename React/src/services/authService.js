import axios from 'axios';

const API_URL = 'http://localhost:3000'; // URL api

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; // token
  };

