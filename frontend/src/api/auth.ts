import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Adjust this to your backend URL

export const login = async ({ email, password }: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const signup = async ({ name, email, password }: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/signup`, { name, email, password });
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${API_URL}/logout`);
  return response.data;
};
